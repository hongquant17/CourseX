import { redirect } from "next/navigation";

import { getProgress } from "@/actions/get-progress";
import { getSession } from "@/lib/auth";
import { CourseNavbar } from "../../_components/course-navbar";
import { CourseSidebar } from "../../_components/course-sidebar";
import { getCourseWithProgress } from "@/actions/get-course-with-progress";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const session = await getSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  const userId = session.user.uid;

  const course = await getCourseWithProgress(params.courseId, userId);

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
          isForum={false}
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
