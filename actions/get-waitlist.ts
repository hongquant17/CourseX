import { db } from "@/lib/db";

type WaitlistItem = {
    id: string; 
    userId: string;
    courseId: string;
    createdAt: Date; 
    updatedAt: Date; 
    isAccepted: boolean;
    userName: string; 
    courseTitle: string; 
};

type GetWaitlist = {
  userId: string;
};

export const getWaitlist = async ({
  userId,
}: GetWaitlist): Promise<WaitlistItem[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        userId,
      },
      include: {
        enrolls: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const waitlist: WaitlistItem[] = courses.flatMap((course) =>
      course.enrolls.map((enroll) => ({
        id: enroll.id,
        userId: enroll.userId,
        courseId: enroll.courseId,
        userName: enroll.user?.name || "",
        courseTitle: course.title || "",
        createdAt: enroll.createdAt,
        updatedAt: enroll.updatedAt,
        isAccepted: enroll.isAccepted,
      }))
    );

    return waitlist;
  } catch (error) {
    console.error("[GET_WAITLIST]", error);
    return [];
  }
};
