"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { navItems } from "@/app/dashboard/_components/DashboardNav";
import Link from "next/link";
import { DoorClosed } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const UserNav = () => {
  const { user } = useKindeBrowserClient();
  console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="flex items-center justify-center rounded-full w-10 h-10 relative"
        >
          <Avatar className="flex items-center justify-center">
            <AvatarImage src={user?.picture || ""} alt="avatar" />
            <AvatarFallback>{user?.given_name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.given_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-2">
          {navItems.map((item) => (
            <DropdownMenuItem
              asChild
              key={item.href}
              className=" w-full  cursor-pointer"
            >
              <Link
                href={item.href}
                className=" flex w-full gap-x-2 items-start justify-start"
              >
                {<item.icon className="w-4 h-4" />}
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="w-full cursor-pointer flex justify-between items-center"
          asChild
        >
          <LogoutLink>
            Logout{" "}
            <span>
              <DoorClosed className="w-4 h-4" />
            </span>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
