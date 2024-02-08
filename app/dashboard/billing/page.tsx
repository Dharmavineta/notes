import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prismaDB from "@/lib/db";
import { CheckCircle } from "lucide-react";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createSubscription, customerPortal } from "@/actions";
import SubmitButton from "@/components/common/SubmitButton";

async function getStripeUser(userId: string) {
  const getUser = await prismaDB.user.findUnique({
    where: {
      userId,
    },
  });

  const data = await prismaDB.subscription.findFirst({
    where: {
      userId: getUser?.id,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  return data;
}

const Billing = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  console.log(user);

  const data = await getStripeUser(user?.id);

  if (data?.status === "active") {
    return (
      <div className="grid items-start gap-8">
        <div className=" flex items-center justify-between px-2">
          <div className=" grid gap-1">
            <h1 className="text-3xl md:text-4xl">Subscriptions</h1>
            <p className="text-lg text-muted-foreground">
              Subscription Settings
            </p>
          </div>
        </div>
        <Card className="w-full lg:w-2/3">
          <CardHeader>
            <CardTitle>Edit Subscriptions</CardTitle>
            <CardDescription>
              You can change your subscriptions here
            </CardDescription>
            <CardContent className="p-0">
              <form action={customerPortal} className="mt-5">
                <SubmitButton>Edit Subscription</SubmitButton>
              </form>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Monthly
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            $30<span className=" ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ad
            assumenda ducimus voluptas accusantium corrupti dolorum libero
            veritatis deleniti explicabo?
          </p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="flex shrink-0">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="ml-3 text-base">Lore Ipshm</p>
            </li>
            <li className="flex items-center">
              <div className="flex shrink-0">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="ml-3 text-base">Lore Ipshm</p>
            </li>
            <li className="flex items-center">
              <div className="flex shrink-0">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="ml-3 text-base">Lore Ipshm</p>
            </li>
            <li className="flex items-center">
              <div className="flex shrink-0">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="ml-3 text-base">Lore Ipshm</p>
            </li>
            <li className="flex items-center">
              <div className="flex shrink-0">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <p className="ml-3 text-base">Lore Ipshm</p>
            </li>
          </ul>
          <form action={createSubscription}>
            <SubmitButton>Proceed with Subscription</SubmitButton>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Billing;
