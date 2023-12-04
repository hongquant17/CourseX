import { isAdmin } from "@/lib/admin";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!isAdmin(userId)) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default AdminLayout;
