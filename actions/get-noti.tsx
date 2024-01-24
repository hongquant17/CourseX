import { db } from "@/lib/db";

export const getNotification = async (userId: string) => {
  try {
    const notiList = await db.notification.findMany({
      where: {
        userId: userId,
      },
    });
    const mappedNotiList = await Promise.all(
          notiList.map(async (notiItem) => {
            const notiId = notiItem.id;
            if (typeof notiItem.notiDataId === "string") {
              const notiData = await db.notificationData.findFirst({
                where: {
                  id: notiItem.notiDataId,
                },
              });
              return {
                notiId,
                ...notiItem, // Spread existing notiItem properties
                ...notiData, // Spread notiData properties (if found)
              };
            } else {
              return notiItem; // Return original notiItem if no notiDataId
            }
          })
        );
    return mappedNotiList;
  } catch (error) {
    console.log("NOTIFICATION", error);
    return;
  }
};
