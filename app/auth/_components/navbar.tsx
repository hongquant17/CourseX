import Link from "next/link";
import { Logo } from "./logo";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

export const Navbar = () => {
  return (
    <div
      className={cn(
        "fixed top-0 w-full h-14 pt-2 px-4 bg-transparent flex items-center animate-fade-in",
        headingFont.className
      )}
    >
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />

        <div className="flex items-center space-x-4 md:w-auto w-full">
          <div className="flex items-center space-x-4 md:space-x-20">
            <Link href="https://github.com/hongquant17/CourseX">
              <Button
                className="text-white hover:text-amber-400 font-bold md:text-md lg:text-lg xl:text-xl"
                variant="link"
              >
                About
              </Button>
            </Link>
            <Link href="https://github.com/hongquant17/CourseX">
              <Button
                className="text-white hover:text-amber-400 font-bold md:text-md lg:text-lg xl:text-xl"
                variant="link"
              >
                Service
              </Button>
            </Link>
            <Link href="https://github.com/hongquant17/CourseX">
              <Button
                className="text-white hover:text-amber-400 font-bold md:text-md lg:text-lg xl:text-xl"
                variant="link"
              >
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
