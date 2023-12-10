import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { useSession } from "next-auth/react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    return redirect("/");
  }

  return <>{children}</>;
};

export default AdminLayout;
