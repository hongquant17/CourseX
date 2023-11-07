import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";


const CoursesPage = async() =>{
    const {userId} = auth();
    if (!userId) {
      return redirect("/");
    }

    const courses = await db.course.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      }
    })

    return (
      <div className="h-full flex justify-center pt-20">
        <DataTable columns={columns} data={courses} />
      </div>
    );
}

export default CoursesPage;