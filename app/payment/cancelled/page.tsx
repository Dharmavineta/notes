import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const Cancelled = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card className="w-[350px] p-10">
        <div className="">
          <div className="w-full flex justify-center">
            <X className="w-6 h-6 rounded-full bg-red-500/30 text-red-500" />
          </div>
          <div className="mt-3 text-center sm:mt-4 w-full">
            <h3 className="text-lg leading-6 font-medium">Payment Failed</h3>
            <div className="mt-2">
              <p className="text-muted-foreground">
                No worries, you won&apos;t be charged, please try again
              </p>
            </div>
            <div className="mt-5 sm:mt-6 w-full">
              <Button asChild className="w-full">
                <Link href={"/dashboard"} className="w-full">
                  Go back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cancelled;
