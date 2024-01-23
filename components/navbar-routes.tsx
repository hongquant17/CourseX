"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "@/components/user-button";
import { PRIVILEGES, ROLES } from "@/lib/constant";
import { isAdminSession } from "@/lib/admin";
import { isTeacherSession } from "@/lib/teacher";
import NotiSection from "./noti-section";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const role = session?.user.role;
  var isAdmin = isAdminSession(role);
  var isTeacher = isTeacherSession(role);

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.startsWith("/courses");
  const isSearchPage = pathname === "/search";
  const isAdminPage = pathname?.startsWith("/admin");
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-1 place-items-center ml-auto">
        {isTeacherPage || isAdminPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="link">
              Exit
            </Button>
          </Link>
        ) : null}
        {isTeacher && !isTeacherPage && !isCoursePage ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="link">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        {isAdmin && !isAdminPage && !isCoursePage ? (
          <Link href="/admin/users">
            <Button size="sm" variant="link">
              Admin
            </Button>
          </Link>
        ) : null}
        <div className="pr-4">
          <ModeToggle />
        </div>
        <div className="pr-4">
          <UserButton />
        </div>
          <NotiSection />
      </div>
    </>
  );
};
