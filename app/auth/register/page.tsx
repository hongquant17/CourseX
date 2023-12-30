import UserForm from "./_components/register-form";
import { Navbar } from "../_components/navbar";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import backgroundImage from '@/public/img/background.jpg'

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

export default async function LandingPage() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      <Navbar />

      <div className="pl-32 sm:flex flex-col items-center justify-center bg-cover bg-center animate-fade-in">
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-4 h-full text-white transition-transform",
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

      <div className="hidden sm:flex flex-col justify-center animate-fade-in">
        <UserForm />
      </div>
    </div>
  );
}
