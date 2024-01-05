import { db } from "@/lib/db";

export async function getCurrentCourse(courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    return course;

  } catch (error) {
    console.error("[GET_CURRENT_COURSE]", error);
    
  }
}
