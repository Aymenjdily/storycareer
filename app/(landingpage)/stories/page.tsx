import prisma from "@/prisma/client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SaveForm from './_components/saveForm'

import Image from "next/image";
import { ArrowRight, ImageIcon } from "lucide-react";
import ReadStory from "@/components/readStory";

const StoriesPage = async () => {
  const stories = await prisma.story.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const saves = await prisma.save.findMany()

  return (
    <div className="py-32 h-full">
      <div className="flex flex-col space-y-3">
        <h1 className="text-3xl max-w-2xl md:text-5xl font-bold">
          Explore Career Stories
        </h1>
        <p className="text-muted-foreground max-w-lg">
          Welcome to the heart of StoryCareer, where real stories from
          professionals across various fields come alive. Dive into these
          narratives to find inspiration, learn from others experiences, and see
          the diverse paths people have taken in their careers.
        </p>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 mt-10 gap-5">
        {stories.map((story) => (
          <Card key={story.id}>
            {
                story.image ? (
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
                )
            }
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
                <SaveForm saves={saves} story={story} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
