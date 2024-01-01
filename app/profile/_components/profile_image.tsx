"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

interface ImageFormProps {
  initialData: User;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "An image is mandatory",
  }),
  preKey: z.string().min(0),
});

export const UserImageForm = ({ initialData }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const [isHover, setIsHover] = useState(false);
  const toggleHover = () => {
    setIsHover(!isHover);
  };

  const router = useRouter();


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/users/change/image`, values).then((response) => {
        toast.success("User image changed");
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Cannot change user image");
    }
  };

  return (
    <div
      className="mt-6 rounded-md p-4 relative"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className={`${isHover ? "blur-sm" : ""}`}>
        {!isEditing &&
          (!initialData.image ? (
            <div className="flex items-center justify-center bg-slate-200 rounded-md h-40 w-40">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Avatar
                className={`cursor-pointer transform transition-transform w-2/3 h-auto`}
              >
                <AvatarImage
                  src={initialData.image ? initialData.image : undefined}
                />
                <AvatarFallback>X</AvatarFallback>
              </Avatar>
            </div>
          ))}
      </div>
      <div
        className={`font-medium ${
          !isEditing
            ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            : ""
        }`}
      >
        {(isHover || isEditing) && (
          <Button onClick={toggleEdit} variant="default">
            {isEditing && <>Cancel</>}
            {!isEditing && !initialData.image && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Image
              </>
            )}
            {!isEditing && initialData.image && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </Button>
        )}
      </div>
      {isEditing && (
        <div>
          <FileUpload
            endpoint="userImage"
            onChange={(url, fileKey) => {
              if (url) {
                onSubmit({ imageUrl: url, preKey: fileKey ? fileKey : ""});
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
