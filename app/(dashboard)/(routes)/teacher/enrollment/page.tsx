import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";

import { getSession } from "@/lib/auth";
  
const UserPage = async () => {
  const session = await getSession();
    
    if (!session) {
        return redirect("/");
    }

    const userId = session.user.uid;

  const enroll = await db.enroll.findMany({
    where: {
      // userId, 
    }, 
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="p-6">
      <DataTable columns={columns} data={enroll} />
    </div>
  );
};

export default UserPage;
