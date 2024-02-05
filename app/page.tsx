import { Button } from "@/components/ui/button";
import React from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Home = () => {
  return (
    <section className=" flex items-center justify-center bg-background h-[calc(100vh-64px)]">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className=" max-w-3xl mx-auto text-center">
          <span className="w-auto px-6 py-3 rounded-full bg-secondary">
            <span className="text-primary text-sm font-bold">
              Sort Your notes easily
            </span>
          </span>
          <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
            Create Notes on your whim
          </h1>
          <p className="max-w-xl mx-auto mt-8  text-base lg:text-xl text-secondary-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            architecto magni fuga ad, quo cumque delectus voluptas explicabo
            neque consequuntur?
          </p>
          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <Button asChild size={"lg"} className="w-full">
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
