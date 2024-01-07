import { db } from "@/lib/db";

export default async function getCoursesCreated(userId: string) {
  try {
    const courses = await db.course.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return courses;
  } catch (error) {
    console.error("[GET_COURSES_CREATED]", error);
    return [];
  }
}
