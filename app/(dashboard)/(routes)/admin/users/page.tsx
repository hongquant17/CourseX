import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Metadata } from "next";
import { getAllUsers } from "@/actions/get-all-users";

export const metadata: Metadata = {
  title: "User Authorization | CourseX",
};

const UserPage = async () => {
  const session = await getSession();
  if (!session) {
    return redirect("/auth/signin");
  }
  const users = await getAllUsers();
  return (
    <div>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UserPage;
