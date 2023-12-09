import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const UserPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const users = await db.users.findMany({
    where: {},
    distinct: ['userId'],
  });

  return (
    <div>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UserPage;
