"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { ModeToggle } from "./mode-toggle";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const role = session?.user.role;
  const isAdmin = role == "admin";
  const isTeacher = role == "teacher";

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses") || pathname === "/";
  const isSearchPage = pathname === "/search";
  const isAdminPage = pathname?.startsWith("/admin");
  /* TODO : remove teacher mode for admin */
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-1 place-items-center ml-auto">
        {isTeacherPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        {isCoursePage || isTeacherPage || isSearchPage ? (
          <Link href="/admin/users">
            <Button size="sm" variant="ghost">
              Admin
            </Button>
          </Link>
        ) : null}
        <div className="pr-4">
          <ModeToggle />
        </div>
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
        {/* <UserButton
          afterSignOutUrl="/"
        /> */}
      </div>
    </>
  );
};
