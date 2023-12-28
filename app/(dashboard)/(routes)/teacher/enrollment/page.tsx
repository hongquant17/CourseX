import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Button } from "@/components/ui/button";

import { getSession } from "@/lib/auth";
import { getWaitlist } from "@/actions/get-waitlist"; 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Approval | CourseX",
};

const UserPage = async () => {
  const session = await getSession();

  if (!session) {
    return redirect("/");
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
