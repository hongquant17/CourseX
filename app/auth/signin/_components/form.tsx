"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import GooglePic from "@/public/google.svg"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Logo } from "../../_components/logo";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormData({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-8 px-8 w-full container flex flex-col mx-auto items-center rounded-lg pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="bg-white opacity-90 rounded-lg justify-center shadow-lg flex items-center p-4 sm:p-4 md:p-6 xl:p-10">
            <div className="flex flex-col w-full h-full pb-6 text-center">
              <Logo />
              <p className="mb-6">Sign in</p>
              <Button
                className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl"
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                <Github className="mr-2 h-4 w-4" /> Login with Github
              </Button>
              <Button
                className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <Image
                  className="pr-2"
                  src={GooglePic}
                  alt=""
                  style={{ height: "2.2rem" }}
                  width={24}
                  height={24}
                />
                Sign in with Google
              </Button>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">or</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>
              <form
                className="flex flex-col w-full h-full pb-6 text-center rounded-3xl"
                onSubmit={onSubmit}
              >
                {error && (
                  <p className="text-center bg-red-300 py-4 mb-6 rounded">
                    {error}
                  </p>
                )}
                <label className="mb-2 text-sm text-start">Email*</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="mail@courseX.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none mb-3 md:mb-7 rounded-2xl"
                />
                <label className="mb-2 text-sm text-start">Password*</label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="flex items-center w-full px-5 py-4 mb-3 md:mb-5 mr-2 text-sm font-medium outline-none rounded-2xl"
                />
                <div className="flex flex-row justify-between mb-5 md:mb-8 items-center">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="mr-4 pl-1">
                    Keep me signed in
                  </Label>
                  <a href="/auth/forget" className="text-sm font-medium">
                    Forgot password?
                  </a>
                </div>
                <Button className="mb-3 md:mb-2 h-14">Sign In</Button>
                <p className="text-sm leading-relaxed">
                  Not registered yet?{" "}
                  <a href="/auth/register" className="font-bold">
                    Create an Account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;