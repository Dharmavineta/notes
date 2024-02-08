import { editData } from "@/actions";
import SubmitButton from "@/components/common/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prismaDB from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export async function getUserData(userId: string) {
  const user = await prismaDB.user.findUnique({
    where: {
      userId: userId,
    },
  });
  return user;
}

const Settings = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const loginUser = await getUserData(user?.id);

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your profile page</p>
        </div>
      </div>
      <Card>
        <form action={editData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>Please provide your information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  defaultValue={loginUser?.name || ""}
                  id="name"
                  placeholder="Name"
                  type="text"
                  name="name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  name="email"
                  disabled
                  defaultValue={loginUser?.email || ""}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="color">Color Schema</Label>
                <Select
                  name="color"
                  defaultValue={loginUser?.colorSchema || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Color" hidden />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton>Save Changes</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
