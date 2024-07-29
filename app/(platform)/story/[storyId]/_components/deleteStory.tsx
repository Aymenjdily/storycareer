"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Trash, Loader } from "lucide-react";
import { Story } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  initialData: Story;
}

const DeleteStory = ({ initialData }: Props) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/story/${initialData.id}`);

      if (res.status === 201) {
        toast("Story is deleted");
        router.push("/story");
        router.refresh();
      }
    } catch (error) {
      toast("Something went wrong", {
        className: "bg-rose-500 text-white",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button disabled={isDeleting} variant={"destructive"} onClick={handleDelete}>
      {isDeleting ? (
        <Loader className="md:mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Trash className="h-5 w-5 md:mr-2" />
      )}
      <span className="md:block hidden">Delete</span>
    </Button>
  );
};

export default DeleteStory;
