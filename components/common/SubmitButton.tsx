"use client";

import React, { FC } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type props = {
  children: React.ReactNode;
  className?: string;
};

const SubmitButton: FC<props> = ({ children, className }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn("w-full", className)}
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <span>
          <Loader2 className="animate-spin w-4 h-4" />
        </span>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default SubmitButton;
