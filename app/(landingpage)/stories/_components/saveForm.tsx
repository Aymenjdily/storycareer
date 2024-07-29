"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { Save, Story } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface Props {
  story: Story;
  saves: Save[];
}

const SaveForm = ({ story, saves }: Props) => {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) return null;

  const getSave = saves.find(
    (save) => save.storyId === story.id && save.userId === userId
  );

  const handleSave = async () => {
    try {
      const res = await axios.post("/api/save", {
        storyId: story.id,
        userId,
      });

      if (res.status === 201) {
        router.refresh();
        toast("Story is saved");
      }
    } catch (error) {
      toast("Something went wrong", {
        className: "bg-rose-500 text-white",
      });
    }
  };

  return !getSave ? (
    <Button variant={"ghost"} onClick={handleSave}>
      <Heart />
    </Button>
  ) : (
    <Button variant={"ghost"}>
      <Heart className="text-rose-500" />
    </Button>
  );
};

export default SaveForm;
