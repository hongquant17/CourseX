import { db } from "@/lib/db";

export default async function getRedirectCourse(courseId: string) {
  try {
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
      },
    });

    return course;
  } catch (error) {
    console.error("[GET_REDIRECT_COURSE]", error);
    throw error;
  }
}
