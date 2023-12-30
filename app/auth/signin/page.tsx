import { cn } from "@/lib/utils";
import LoginForm from "./_components/form";
import { Navbar } from "../_components/navbar";
import localFont from "next/font/local";
import backgroundImage from "@/public/img/solid.jpg";
import { Metadata } from "next";

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

export const metadata: Metadata = {
  title: "Sign in - CourseX",
};

export default async function LandingPage() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 bg-gradient-to-r from-blue-800 to-cyan-400 min-h-screen"
      // style={{
      //   backgroundImage: `url(${backgroundImage.src})`,
      // }}
    >
      <Navbar />

      <div className="hidden pl-32 sm:flex flex-col items-center justify-center bg-cover bg-center animate-fade-in">
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-2 h-full text-white transition-transform md:pr-10",
            headingFont.className
          )}
        >
          <div className="font-bold text-2xl sm:text-4xl lg:text-6xl text-center">
            The Education Platform
          </div>
          <div className="font-bold text-2xl sm:text-4xl lg:text-6xl text-center">
            For The Future
          </div>
          <div className="font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 p-2 rounded-md pb-2 w-fit text-2xl sm:text-xl lg:text-3xl text-center">
            Join Right Now
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex flex-col justify-center animate-fade-in h-full">
        <LoginForm />
      </div>
    </div>
  );
}
