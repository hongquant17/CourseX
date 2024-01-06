import getRedirectCourse from "@/actions/get-redirect-course";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CourseX",
};

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const course = await getRedirectCourse(params.courseId);

  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}
 
export default CourseIdPage;