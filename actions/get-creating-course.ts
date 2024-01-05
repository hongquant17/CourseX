import { db } from "@/lib/db";

export default async function getCreatingCourse(
  courseId: string,
  userId: string
) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
        categories: {
          include: {
            category: {},
          },
        },
      },
    });

    return course;
  } catch (error) {
    console.error("[GET_CREATING_COURSE]", error);
    
  }
}
