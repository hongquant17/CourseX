"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname} from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { ModeToggle } from "./mode-toggle";

export const NavbarRoutes = () => {
    const pathname = usePathname();
    
    
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");
    const isSearchPage =pathname === "/search";

    return (
      <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
        <div className="flex gap-x-1 place-items-center ml-auto">
        {isTeacherPage || isPlayerPage ? (
            <Link href="/">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit
                </Button>
            </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        )}
        <div className="pr-4">
          <ModeToggle/>
        </div>
        <UserButton
          afterSignOutUrl="/"
        />
      </div>
    </>
    )
}