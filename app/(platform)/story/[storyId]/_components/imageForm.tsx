"use client";

import React from "react";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Story } from "@prisma/client";

import { Button } from "@/components/ui/button";
import FileUploader from "@/components/fileUploader";

interface Props {
  initialData: Story;
}

const ImageForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (image: { image: string }) => {
    try {
      const res = await axios.patch(`/api/story/${initialData.id}`, image);

      if (res.status === 201) {
        toast("Story updated!", {
          className: "bg-emerald-500 text-white",
        });
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      toast("Something went wrong", {
        className: "bg-rose-500 text-white",
      });
    }
  };

  return (
    <div className="border border-secondary rounded-md p-4 bg-secondary w-80">
      <div className="flex items-center justify-between font-medium text-primary">
        Image
        <Button variant={"ghost"} type="button" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.image && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add image
            </>
          )}
          {!isEditing && initialData.image && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.image ? (
          <div className="h-60 border-2 border-gray-300 rounded-md flex items-center justify-center">
            <ImageIcon className="h-10 w-10 text-primary" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData.image}
              alt={initialData.title}
              fill
              className="rounded-md object-cover"
            />
          </div>
        ))}
      {isEditing && (
        <>
          <FileUploader
            endPoint="storyImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ image: url });
              }
            }}
          />
          <p className="text-xs text-gray-400 text-muted-foreground mt-4">
            16:9 recommended aspect ratio
          </p>
        </>
      )}
    </div>
  );
};

export default ImageForm;
