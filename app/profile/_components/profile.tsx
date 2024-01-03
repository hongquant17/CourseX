"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserImageForm } from "./profile_image";
import { getRole } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  old_pass: string;
  new_pass: string;
  role: string;
  image: string;
}

export const Profile = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    id: '',
    email: '',
    phone: '',
    username: '',
    old_pass: '',
    new_pass: '',
    role: '',
    image: '',
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/users", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const response = await res.json();
        setFormData({
          id: response.id,
          name: response.name,
          email: response.email,
          phone: response.phone,
          username: response.username,
          old_pass: '',
          new_pass: '',
          role: response.role,
          image: response.image,
        });
      } catch (error) {
        toast.error("Cannot get user information");
        
      }
    };

    fetchUserData();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "PATCH",
      body: JSON.stringify({ formData }),
      headers,
    });
    const response = await res.json();
    if (!res.ok) {
      toast.error(response.message);
    } else {
      toggleEdit();
      toast.success(response.message);
      router.refresh();
      router.push("/profile");
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center mr-28">
        <UserImageForm initialData={formData} />
        <span className="font-semibold">{formData.name}</span>
      </div>
      {!isEditing && (
        <div className="relative flex flex-col items-center rounded-[20px] mx-auto p-3">
          <div className="mt-2 mb-8 w-full">
            <h4 className="px-2 text-4xl font-extrabold">User information</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 px-2 w-full">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="text-base font-medium">{formData.name}</p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-base font-medium">{formData.email}</p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-base font-medium">
                {formData.phone ? formData.phone : ""}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Username</p>
              <p className="text-base font-medium">{formData.username}</p>
            </div>
            
            <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Role</p>
              <p className="text-base font-medium">{getRole(formData.role)}</p>
            </div>
          </div>
          <div> 
            <Button onClick={toggleEdit}>Edit</Button>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="relative flex flex-col items-center rounded-[20px] mx-auto p-3">
          <div className="mt-2 mb-8 w-full">
            <h4 className="px-2 text-4xl font-extrabold">User information</h4>
          </div>
          <form className="grid grid-cols-2 gap-4 px-2 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 mb-2">Full Name</p>
              <Input type="text" id="name" name="name" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 font-medium" required onChange={handleChange} value={formData.name}/>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 mb-2">Email</p>
              <Input type="email" id="email" name="email" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 font-medium" required onChange={handleChange} value={formData.email}/>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 mb-2">Phone</p>
              <Input type="tel" id="phone" name="phone" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 font-medium" required onChange={handleChange} value={formData.phone}/>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 mb-2">Username</p>
              <Input type="text" id="username" name="username" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 font-medium" onChange={handleChange} value={formData.username}/>
            </div>
      
            <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 pt-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 mb-2">Old password</p>
              <Input type="password" id="oldpassword" name="old_pass" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 font-medium" onChange={handleChange} value={formData.old_pass}/>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 pt-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 mb-2">New password</p>
              <Input type="password" id="newpassword" name="new_pass" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 font-medium" onChange={handleChange} value={formData.new_pass}/>
            </div>
            <span className="text-xs ml-4">
              If you don&apos;t want to change your password, leave it empty.
            </span>
            <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 mb-2"></p>
              <p className="text-base font-medium"></p>
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600 mb-2">Role</p>
              <p className="text-base font-medium">{getRole(formData.role)}</p>
            </div>
            <div className="col-span-2 flex items-center justify-center">
            <Button onClick={toggleEdit} className="mr-4">
              <X />
            </Button>
            <Button type="submit">Submit</Button>
          </div>
          </form>
        </div>
      )}
    </div>
  );
};
