import React, { FC } from "react";
import DashboardNav from "./_components/DashboardNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prismaDB from "@/lib/db";
import { stripe } from "@/lib/stripe";

type props = {
  children: React.ReactNode;
};

const layout: FC<props> = async ({ children }) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const isUser = await prismaDB.user.findUnique({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
      email: true,
    },
  });
  if (!isUser) {
    const newUser = await prismaDB.user.create({
      data: {
        name: `${user?.given_name} ${user?.family_name}`,
        email: user?.email,
        userId: user?.id!,
      },
    });
  }

  if (!isUser?.stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: isUser?.email as string,
    });

    await prismaDB.user.update({
      where: {
        id: isUser?.id,
      },
      data: {
        stripeCustomerId: newCustomer.id,
      },
    });
  }

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col space-y-6 h-[calc(100vh-64px)]">
      <div className="container grid flex-1 gap-12 h-full md:grid-cols-[200px_1fr]">
        <aside className="hidden border-r py-5 h-full w-[200px] flex-col md:flex">
          <div className="w-full">
            <DashboardNav />
          </div>
        </aside>
        <main className="py-5">{children}</main>
      </div>
    </div>
  );
};

export default layout;
