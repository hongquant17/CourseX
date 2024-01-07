import { db } from "@/lib/db";

export async function getCourseWithProgress(courseId: string, userId: string) {
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
          include: {
            userProgress: {
              where: {
                userId,
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    return course;
    
  } catch (error) {
    console.error("[GET_COURSE_WITH_PROGRESS]", error);
    
  }
}
