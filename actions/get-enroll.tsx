import { db } from "@/lib/db";

export const getEnroll = async (courseId: string, userId: string) => {
  try {
    const enroll = await db.enroll.findFirst({
      where: {
        courseId: courseId,
        userId: userId,
      },
    });

    return enroll;
  } catch (error) {
    console.error("[GET_ENROLL]", error);
  }
};
