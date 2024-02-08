"use client";
import React from "react";
import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

const DashboardNav = () => {
  const pathName = usePathname();
  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Link href={item.href} key={item.href}>
          <span
            className={cn(
              "group flex items-center gap-x-2  rounded-md px-3 hover:text-accent-foreground py-2 text-sm font-medium hover:bg-accent",
              pathName === item.href ? "bg-accent" : "bg-transparent"
            )}
          >
            {<item.icon className="w-4 h-4 text-primary" />}
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNav;
