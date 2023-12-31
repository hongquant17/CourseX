"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ROLES } from "@/lib/constant";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
interface FormData {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  role: string;
}
const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role: ROLES["NOT_ADMIN"] + "," + ROLES["USER"],
  });
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers,
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen pt-8 round-3xl">
        <div className="opacity-90 bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="items-center justify-center h-full pb-4">
            <Link
              href={`/auth/signin`}
              className="w-fit flex items-center text-sm hover:opacity-75
                          transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to sign in
            </Link>
          </div>
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-gray-200 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create a new account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your details to register.
          </p>
          <form onSubmit={handleSubmit} method="POST">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Full Name *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="Nguyen Van A"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="abc@coursex.com"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password *
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                placeholder="Enter your password"
                required
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Phone *
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="0123456xxx"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Username{" "}
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                placeholder="vanished123"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Register
            </button>
            <p className="text-gray-600 text-xs text-center mt-4">
              By clicking Register, you agree to accept CourseX&apos;s
              <a href="#" className="text-blue-500 hover:underline">
                {" "}
                Terms and Conditions
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default UserForm;
