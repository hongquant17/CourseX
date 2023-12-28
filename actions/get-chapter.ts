import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
};

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const enroll = await db.enroll.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
        isAccepted: true,
      }
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      }
    });

    if (!chapter) {
      throw new Error("Chapter not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (enroll) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId
        }
      });
    }

    if (chapter.isFree || enroll) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        }
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          }
        },
        orderBy: {
          position: "asc",
        }
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        }
      }
    });

    return {
      chapter,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      enroll,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      enroll: null,
    }
  }
}