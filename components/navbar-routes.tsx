"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { ModeToggle } from "./mode-toggle";
import UserButton from "@/components/user-button";
import { PRIVILEGES, ROLES } from "@/lib/constant";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const role = session?.user.role;
  var isAdmin = false;
  var isTeacher = false;
  if (role) isAdmin = role[PRIVILEGES["ADMIN"]] == ROLES["ADMIN"];
  if (role) isTeacher = role[PRIVILEGES["OTHERS"]] == ROLES["TEACHER"];

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
            <Button size="sm" variant="link">
              Exit
            </Button>
          </Link>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="link">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        {isAdmin && !isAdminPage ? (
          <Link href="/admin/users">
            <Button size="sm" variant="link">
              Admin
            </Button>
          </Link>
        ) : null}
        <div className="pr-4">
          <ModeToggle />
        </div>
        <div>
            <UserButton {...session}></UserButton>
        </div>
      </div>
    </>
  );
};
