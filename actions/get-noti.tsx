import { db } from "@/lib/db";

export const getNotification = async (userId: string) => {
  try {
    const notiList = await db.notification.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      }
    });
    return notiList;
  } catch (error) {
    console.log("NOTIFICATION", error);
    return;
  }
};
