import { createNote } from "@/actions";
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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";

const NewNote = () => {
  return (
    <div>
      <Card>
        <form action={createNote}>
          <CardHeader>
            <CardTitle>Create New Note</CardTitle>
            <CardDescription>
              You can create and save your notes here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="gap-y-2 flex flex-col">
              <Label htmlFor="title">Title</Label>
              <Input required placeholder="title" id="title" name="title" />
            </div>
            <div className="gap-y-2 flex flex-col">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Description"
                id="description"
                name="description"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild className="" variant={"outline"}>
              <Link href={"/dashboard"}>Cancel</Link>
            </Button>
            <SubmitButton className="w-fit">Create New Note</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewNote;
