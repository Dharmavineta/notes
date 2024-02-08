import { deleteNote } from "@/actions";
import SubmitButton from "@/components/common/SubmitButton";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
import prismaDB from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FC } from "react";

type props = {
  params: { noteId: string };
};

async function getNote(noteId: string, userId: string) {
  const user = await prismaDB.user.findUnique({
    where: {
      userId: userId,
    },
  });
  const note = await prismaDB.note.findUnique({
    where: {
      id: noteId,
      userId: user?.id,
    },
  });

  return note;
}
const NotePage: FC<props> = async ({ params }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/dashboard");
  }

  const note = await getNote(params.noteId, user?.id);

  if (!note) {
    return redirect("/dashboard");
  }

  const editNote = async (data: FormData) => {
    "use server";

    const title = data.get("title") as string;
    const description = data.get("description") as string;
    if (!title || !description) {
      return { error: "Title and des required" };
    }
    const updatedNote = await prismaDB.note.update({
      where: {
        id: note.id,
      },
      data: {
        title,
        description,
      },
    });
    return redirect("/dashboard");
  };

  return (
    <div>
      <Card>
        <form action={editNote}>
          <CardHeader>
            <CardTitle>Edit Note</CardTitle>
            <CardDescription>You can edit your note here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="gap-y-2 flex flex-col">
              <Label htmlFor="title">Title</Label>
              <Input
                defaultValue={note.title}
                required
                placeholder="title"
                id="title"
                name="title"
              />
            </div>
            <div className="gap-y-2 flex flex-col">
              <Label htmlFor="description">Description</Label>
              <Textarea
                defaultValue={note.description}
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
            <SubmitButton className="w-fit">Save Changes</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NotePage;
