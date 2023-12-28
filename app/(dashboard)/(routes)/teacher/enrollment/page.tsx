import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";

import { getSession } from "@/lib/auth";
import { getWaitlist } from "@/actions/get-waitlist"; 

const UserPage = async () => {
  const session = await getSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  const userId = session.user.uid;

  try {
    const waitlist = await getWaitlist({ userId });
    
    return (
      <div className="p-6">
        <DataTable columns={columns} data={waitlist} />
      </div>
    );
  } catch (error) {
    console.error("[ENROLLMENT_PAGE]", error);
    return <div>Error loading waitlist data.</div>;
  }
};

export default UserPage;
