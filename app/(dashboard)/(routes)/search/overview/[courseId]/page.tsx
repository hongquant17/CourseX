import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Thumbnail } from "./_components/thumbnail";
import { CourseDescription } from "./_components/coures-description";
import { Enrollment } from "./_components/enrollment";
import { ArrowLeft } from "lucide-react";
import { CourseProgress } from "@/components/course-progress";
import { getProgress } from "@/actions/get-progress";
import { getSession } from "@/lib/auth";
import { ViewCourse } from "./_components/view";
import { Forum } from "./_components/forum-button";

const CourseIdOverview = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const session = await getSession();

  if (!session) {
    return redirect("/")
  }
  const userId = session.user.uid;

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
      },
      enrolls: {
        where: {
          userId: userId, 
          courseId: params.courseId
        }
      }
    }
  });

  if (!course) {
    return redirect("/");
  }

  console.log(course)

  const isEnrolled = course.enrolls.length > 0;
  let isAccepted = false;
  if (isEnrolled) {
    // Nếu có thông tin enroll, lấy giá trị của trường isAccepted
    isAccepted = course.enrolls[0].isAccepted;
  }
  console.log(isAccepted)
  console.log(isEnrolled)
  const progressCount = await getProgress(userId, course.id)

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
            progressCount={progressCount}
          />
        </div>

        <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
          {!isAccepted ?
            <Enrollment
              courseId={course.id}
              isEnrolled={isEnrolled}
            /> : null}

          <ViewCourse
            courseId={course.id}
            isAccepted={isAccepted}
          />
          {isAccepted ?
            <Forum
              courseId={course.id}
              isAccepted={isEnrolled}
            /> : null}
        </div>

      </div>
    </div>

  );
}

export default CourseIdOverview;