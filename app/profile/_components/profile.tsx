"use client";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { UserImageForm } from "./profile_image";

export const Profile = (userData: any) => {
  const { data: session } = useSession();

  if (!session) {
    redirect("/");
  }
  const userId = session.user.uid;

  const [isUploading, setUpload] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  var userSrc = isDarkMode ? "/light-no-ava.png" : "/no-avatar.svg";
  if (theme == "system") {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      userSrc = "/light-no-ava.png";
    } else {
      userSrc = "/no-avatar.svg";
    }
  }


  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center mr-28">
        <Avatar className={`cursor-pointer transform transition-transform mb-4 w-2/3 h-auto ${isUploading ? "hidden" : ""}` } onClick={() => setUpload(prev => !prev)}>
          <AvatarImage
            src={session?.user.image ? session?.user.image : userSrc}
          />
        </Avatar>
        {isUploading && (
            <UserImageForm 
            initialData={userData}
            courseId={userId}
            /> 
        )}
        <span className="font-semibold">
            {session?.user.name}
        </span>
      </div>
      <div className="relative flex flex-col items-center rounded-[20px] mx-auto p-3">
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-5xl font-extrabold">
            User information
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Education</p>
            <p className="text-base font-medium">
              Stanford University
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Languages</p>
            <p className="text-base font-medium">
              English, Spanish, Italian
            </p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Department</p>
            <p className="text-base font-medium">
              Product Design
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Work History</p>
            <p className="text-base font-medium">
              English, Spanish, Italian
            </p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Organization</p>
            <p className="text-base font-medium">
              Simmmple Web LLC
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Birthday</p>
            <p className="text-base font-medium">
              20 July 1986
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
