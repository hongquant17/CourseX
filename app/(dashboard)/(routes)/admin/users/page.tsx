import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const UserPage = async () => {
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  const userId = session.user.uid;

  const users = await db.user.findMany({
    where: {},
    distinct: ["id"],
  });

  return (
    <div>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UserPage;
