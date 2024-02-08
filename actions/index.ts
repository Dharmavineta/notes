"use server";
import { getUserData } from "@/app/dashboard/settings/page";
import prismaDB from "@/lib/db";
import { getStripeSession, stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editData = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const name = formData.get("name") as string;
  const colorSchema = formData.get("color") as string;

  if (!name || !colorSchema) {
    return { error: "Input needed" };
  }

  const loginuser = await getUser();

  if (!loginuser) {
    return { error: "No user found" };
  }

  const user = await getUserData(loginuser?.id);

  if (!user) {
    return { error: "No user found" };
  }

  const updatedUser = await prismaDB.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      colorSchema,
    },
  });

  revalidatePath("/");
};

export const createSubscription = async () => {
  const { getUser } = getKindeServerSession();
  const loginuser = await getUser();
  if (!loginuser) {
    return { error: "No user found" };
  }

  const user = await getUserData(loginuser?.id);

  if (!user) {
    return { error: "No user found" };
  }
  if (!user.stripeCustomerId) {
    return { error: "Unable to get customer Id" };
  }

  const subscriptionUrl = await getStripeSession({
    customerId: user.stripeCustomerId,
    domainUrl: "http://localhost:3000",
    priceId: process.env.STRIPE_PRICE_ID as string,
  });

  return redirect(subscriptionUrl);
};

export const customerPortal = async () => {
  const { getUser } = getKindeServerSession();
  const loginuser = await getUser();
  if (!loginuser) {
    return { error: "No user found" };
  }

  const user = await getUserData(loginuser?.id);

  if (!user) {
    return { error: "No user found" };
  }
  if (!user.stripeCustomerId) {
    return { error: "Unable to get customer Id" };
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: "http://localhost:3000/dashboard",
  });

  return redirect(session.url);
};

export const createNote = async (data: FormData) => {
  const title = data.get("title") as string;
  const description = data.get("description") as string;

  if (!title || !description) {
    return { error: "No title and description" };
  }
  const { getUser } = getKindeServerSession();
  const loginuser = await getUser();
  if (!loginuser) {
    return { error: "No user found" };
  }

  const user = await getUserData(loginuser?.id);

  if (!user) {
    return { error: "No user found" };
  }

  const newNote = await prismaDB.note.create({
    data: {
      title,
      description,
      userId: user.id,
    },
  });
  revalidatePath("/dashboard");

  return redirect("/dashboard");
};

export const deleteNote = async (data: FormData) => {
  const id = data.get("id") as string;

  const { getUser } = getKindeServerSession();
  const loginuser = await getUser();
  if (!loginuser) {
    return { error: "No user found" };
  }

  const user = await getUserData(loginuser?.id);

  if (!user) {
    return { error: "No user found" };
  }

  await prismaDB.note.delete({
    where: {
      id,
    },
  });
  revalidatePath("/dashboard");
  return redirect("/dashboard");
};
