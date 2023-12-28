"use client";
import { Logo } from "../../(dashboard)/_components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@/components/user-button";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm justify-between">
      <Logo />
      <div className="flex">
        <div className="pr-4">
          <ModeToggle />
        </div>
        <div>
          <UserButton></UserButton>
        </div>
      </div>
    </div>
  );
};
