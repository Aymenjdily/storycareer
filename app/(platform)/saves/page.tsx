import React from "react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import Image from "next/image";
import { ImageIcon, ArrowRight } from "lucide-react";

import ReadStory from "@/components/readStory";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RemoveSave from "./_components/removeSave";

const SavesPage = async () => {
  const { userId } = auth();

  const saves = await prisma.save.findMany({
    where: {
      userId: userId!,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      story: true,
    },
  });

  return (
    <div className="flex flex-col space-y-5 w-full">
      <h1 className=" font-semibold">My saves</h1>
      <Separator />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        {saves.map(({ story, id }) => (
          <Card key={id}>
            {story.image ? (
              <div className="w-full h-52 aspect-video relative rounded-md">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-52 w-full flex items-center justify-center aspect-video bg-secondary relative rounded-md">
                <ImageIcon className="h-8 w-8" />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{story.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {story.story}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <ReadStory initialData={story}>
                <Button>
                  Read More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </ReadStory>
              <RemoveSave saveId={id} />
            </CardFooter>
          </Card>
        ))}
      </div>
      {saves.length < 1 && (
        <div className="flex items-center justify-center">
          <Image
            src="/empty.svg"
            alt="empty"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default SavesPage;
