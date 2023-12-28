import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";


const CoursesPage = async() =>{
  const session = await getSession();
    
  if (!session) {
      return redirect("/auth/signin");
  }

  const userId = session.user.uid;

    const courses = await db.course.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      }
    })

    return (
      <div className="py-8 px-16">
        <DataTable columns={columns} data={courses} />
      </div>
    );
}

export default CoursesPage;