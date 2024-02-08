import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prismaDB from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = headers().get("stripe-Signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (error) {
      console.log(error);
      return new NextResponse("Internal server error", { status: 500 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const customerId = String(session.customer);

      const user = await prismaDB.user.findUnique({
        where: {
          stripeCustomerId: customerId,
        },
      });

      if (!user) {
        return new NextResponse("No user", { status: 404 });
      }

      await prismaDB.subscription.create({
        data: {
          stripeSubscriptionId: subscription.id,
          userId: user.id,
          currentPeriodstart: subscription.current_period_start,
          currentPeriodEnd: subscription.current_period_end,
          status: subscription.status,
          planId: subscription.items.data[0].plan.id,
          interval: String(subscription.items.data[0].plan.interval),
        },
      });
    }

    if (event.type === "invoice.payment_succeeded") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await prismaDB.subscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          planId: subscription.items.data[0].price.id,
          currentPeriodstart: subscription.current_period_start,
          currentPeriodEnd: subscription.current_period_end,
          status: subscription.status,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
