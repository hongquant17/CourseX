import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function getOverviewCourse(courseId: string) {
  try {
    const session = await getSession();

    if (!session) {
      return redirect("/");
    }
    const userId = session.user.uid;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
        enrolls: {
          where: {
            userId: userId,
            courseId: courseId,
          },
        },
      },
    });

    return course;
  } catch (error) {
    console.error("[GET_OVERVIEW_COURSE]", error);
  }
}
