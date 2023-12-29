"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course, Category } from "@prisma/client";
import { TagList } from "@/components/ui/tag-list";
import { Tag, TagInput } from "@/components/ui/tag-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
  courseCategoryTags: Tag[];
  courseId: string;
  option: Tag[];
}

const FormSchema = z.object({
  categories: z.array(z.object({
      id: z.string(),
      text: z.string()
  })),
});

export const CategoryForm = ({
  courseCategoryTags,
  courseId,
  option
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [editedTags, setEditedTags] = useState<Tag[]>([]);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    setEditedTags(tags);
  }

  const updateTag = () => {
    setTags(editedTags);
  }

  useEffect(() => {
    initializeTags();
  }, []);

  const initializeTags = () => {
    setTags(courseCategoryTags);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: tags,
    },
  });

  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;

  const Submit = async () => {
    try {
      await axios.patch(`/api/courses/${courseId}/categories`, { categories: tags });
      toast.success("Đã cập nhật khóa học");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      
      {!isEditing && (
        <p className={`text-sm mt-2 ${tags && "text-slate-500 italic"}`}>
        {tags.map((tag) => (tag.text)).join(", ")}
        </p>
      )}
      {isEditing && (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(Submit)} className="space-y-4 mt-4">
          <FormItem>
            <FormControl>
            <div className="mt-4">
              <TagInput
                tags={editedTags}
                setTags={setEditedTags}
                placeholder="Select categories..."
                enableAutocomplete = {true}
                autocompleteOptions={option}
                draggable
              />
            </div>
            </FormControl>
            <FormMessage />
          </FormItem>
          <div className="flex items-center gap-x-2">
            <Button onClick={updateTag} disabled={!isValid || isSubmitting} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
      )}

    </div>
  );
};