import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser;
  return (
    <nav className=" border-b bg-background h-16 flex items-center ">
      <div className="container flex ic justify-between px-5 lg:px-0">
        <Link href="/">
          <h1 className="text-2xl font-bold">SaaS</h1>
        </Link>
        {(await isAuthenticated()) ? (
          <div className="flex items-center gap-x-5">
            <Button asChild variant={"outline"}>
              <LogoutLink>Logout</LogoutLink>
            </Button>
            <UserNav />
          </div>
        ) : (
          <div className="flex gap-x-5">
            <Button asChild>
              <LoginLink> Login</LoginLink>
            </Button>

            <Button variant={"outline"} asChild>
              <RegisterLink> Register</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
