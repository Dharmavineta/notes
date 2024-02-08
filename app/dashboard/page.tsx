import { Button } from "@/components/ui/button";
import prismaDB from "@/lib/db";
import { Edit, File, Plus, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { deleteNote } from "@/actions";
import SubmitButton from "@/components/common/SubmitButton";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const loginUser = await prismaDB.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  const notes = await prismaDB.note.findMany({
    where: {
      userId: loginUser?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="items-start grid gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-2">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>{" "}
          <p className="text-muted-foreground text-lg">Manage your notes</p>
        </div>
        <Button asChild>
          <Link href={"/dashboard/new"}>
            Create New Note
            <Plus className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
      {notes.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <p className="mt-5 text-sm leading-6">
            You don&apos;t have any notes
          </p>
          <Button asChild className="mt-5" variant={"outline"}>
            <Link href={"/dashboard/new"}>Create Note</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {notes.map((note) => (
            <Card
              key={note.id}
              className="flex items-center justify-between p-4"
            >
              <div className="">
                <h2 className="font-semibold text-xl text-primary">
                  {note.title}
                </h2>
                <p>
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "full",
                  }).format(new Date(note.createdAt))}
                </p>
              </div>
              <div className="flex gap-x-4">
                <Button variant={"outline"} asChild>
                  <Link href={`/dashboard/new/${note.id}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                <form action={deleteNote}>
                  <input name="id" value={note.id} hidden />
                  <SubmitButton className="w-fit bg-rose-500">
                    <Trash className="w-4 h-4" />
                  </SubmitButton>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
