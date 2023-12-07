import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";

const UserPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findMany({
    where: {
      // userId, 
    }, 
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="p-6">
      <DataTable columns={columns} data={course} />
    </div>
  );
};

export default UserPage;
