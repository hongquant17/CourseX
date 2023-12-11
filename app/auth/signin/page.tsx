import { getProviders, signIn } from 'next-auth/react';
import LoginForm from './_components/form';
import { getSession } from '@/lib/auth';
import GooglePic from "@/public/google.svg";
import GithubPic from "@/public/github.svg";
import Image from 'next/image';

export default async function RegisterPage() {
  return (
    <>
      <LoginForm/>
      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>

      <a
        className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
        style={{ backgroundColor: "#3b5998" }}
        role="button"
      >
        <Image
          className="pr-2"
          src={GooglePic}
          alt=""
          style={{ height: "2rem" }}
        />
        Continue with Google
      </a>
      <a
        className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
        style={{ backgroundColor: "#55acee" }}
        role="button"
      >
        <Image
          className="pr-2"
          src={GithubPic}
          alt=""
          style={{ height: "2.2rem" }}
        />
        Continue with GitHub
      </a>
    </>
  );
};