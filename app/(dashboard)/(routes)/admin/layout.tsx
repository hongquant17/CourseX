import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { isAdminSession } from "@/lib/admin";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!isAdminSession(session?.user.role)) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default AdminLayout;
