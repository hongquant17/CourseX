import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Thumbnail } from "./_components/thumbnail";
import { CourseDescription } from "./_components/coures-description";
import { Enrollment } from "./_components/enrollment";
import { ArrowLeft } from "lucide-react";
const CourseIdOverview = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      },
      category: {
        select: {
          name: true,
        },
        where: {}
      }
    }
  });

  if (!course) {
    return redirect("/");
  }

  console.log(course)

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <Link
        href={`/search`}
        className="w-fit flex items-center text-sm hover:opacity-75
                          transition mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Trở về tìm kiếm khóa học
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
          <Thumbnail
            imgUrl={course.imageUrl!}
          />
          <CourseDescription
            title={course.title}
            numChapter={course.chapters.length}
            description={course.description ?? "No Description"}
          />
        </div>

        <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
          <Enrollment
            courseId={course.id}
          />
        </div>

      </div>
    </div>

  );
}

export default CourseIdOverview;