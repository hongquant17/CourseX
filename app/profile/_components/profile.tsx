"use client";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { useState } from "react";
import { UserImageForm } from "./profile_image";
import { getRole } from "@/lib/utils";

export const Profile = (userData: any) => {
  userData = userData.userData;

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center mr-28">
        <UserImageForm initialData={userData} />
        <span className="font-semibold">{userData.name}</span>
      </div>
      <div className="relative flex flex-col items-center rounded-[20px] mx-auto p-3">
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-5xl font-extrabold">User information</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="text-base font-medium">{userData.name}</p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-base font-medium">{userData.email}</p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Phone</p>
            <p className="text-base font-medium">
              {userData.phone ? userData.phone : ""}
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Role</p>
            <p className="text-base font-medium">{getRole(userData.role)}</p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600"></p>
            <p className="text-base font-medium"></p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600"></p>
            <p className="text-base font-medium"></p>
          </div>
        </div>
      </div>
    </div>
  );
};
