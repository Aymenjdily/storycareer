"use client";

import { Story } from "@prisma/client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader, Pencil } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  initialData: Story;
}

const formSchema = z.object({
  story: z
    .string()
    .min(30, {
      message: "Story is required !",
    })
    .max(5000),
});

const StoryForm = ({ initialData }: Props) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story: initialData.story || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      toast("Story is updating...");

      const res = await axios.patch(`/api/story/${initialData.id}`, {
        ...values,
      });

      if (res.status === 201) {
        toast("Story is Updated", {
          className: "bg-emerald-500 text-white",
        });
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      toast("Something went wrong", {
        className: "bg-rose-500 text-white",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="border border-secondary rounded-md p-4 bg-secondary w-80">
      <div className="flex items-center justify-between font-medium text-primary">
        Story
        <Button variant={"ghost"} type="button" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit story
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className="text-sm mt-2 text-primary">{initialData.story || "No story"}</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="One day..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && <Loader className="mr-2 w-5 h-5 animate-spin" />}
              Update
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default StoryForm;
