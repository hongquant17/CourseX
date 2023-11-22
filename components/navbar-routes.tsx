"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname} from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { ModeToggle } from "./mode-toggle";

export const NavbarRoutes = () => {
    const pathname = usePathname();
    const { userId } = useAuth();

    
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage =pathname === "/search";

    return (
      <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
        <div className="flex gap-x-1 place-items-center ml-auto">
        {isTeacherPage || isSearchPage ? (
            <Link href="/">
                <Button size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit
                </Button>
            </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
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