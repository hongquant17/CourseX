import UserForm from "./_components/register-form";
import { Navbar } from "../_components/navbar";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import backgroundImage from "@/public/img/background.jpg";
import { Metadata } from "next";

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

export const metadata: Metadata = {
  title: "Register | CourseX",
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

      <div className="hidden md:pl-32 sm:flex flex-col items-center justify-center bg-cover bg-center animate-fade-in ">
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-2 h-full text-white transition-transform sm:pl-4 md:pr-16 font-bold text-center",
            headingFont.className
          )}
        >
          <div className="text-4xl sm:text-5xl lg:text-6xl">
            The Education Platform
          </div>
          <div className="text-4xl sm:text-5xl lg:text-6xl">For The Future</div>
          <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 p-2 rounded-md pb-2 w-fit text-xl sm:text-2xl lg:text-3xl">
            Join Right Now
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex flex-col justify-center animate-fade-in h-full">
        <UserForm />
      </div>
    </div>
  );
}
