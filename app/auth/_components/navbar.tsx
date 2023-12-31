import Link from "next/link";
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
        "fixed top-0 w-full h-14 pt-2 bg-transparent flex items-center justify-center animate-fade-in",
        headingFont.className
      )}
    >
      <div className=" mx-auto flex items-center w-full justify-center">
        <div className="flex items-center sm:w-auto justify-center w-full">
          <div className="flex items-center space-x-10 md:space-x-36">
            <Link href="https://github.com/hongquant17/CourseX">
              <Button
                className="text-white hover:text-blue-800 font-bold md:text-lg xl:text-xl"
                variant="link"
              >
                About
              </Button>
            </Link>
            <Link href="https://github.com/hongquant17/CourseX">
              <Button
                className="text-white hover:text-blue-800 font-bold md:text-lg xl:text-xl"
                variant="link"
              >
                Service
              </Button>
            </Link>
            <Link href="https://github.com/hongquant17/CourseX">
              <Button
                className="text-white hover:text-blue-800 font-bold md:text-lg xl:text-xl"
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
