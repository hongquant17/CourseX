import { redirect } from "next/navigation";

import { getProgress } from "@/actions/get-progress";
import { getSession } from "@/lib/auth";
import { CourseNavbar } from "../_components/course-navbar";
import { CourseSidebar } from "../_components/course-sidebar";
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

  const progressCount = -1;

  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
          isForum={true}
        />
      </div>
      <main className="pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
