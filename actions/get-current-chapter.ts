import { db } from "@/lib/db";

export async function getCurrentChapter(
  courseId: string,
  chapterId: string,
) {
  try {
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      include: {
        muxData: true,
      }
    });

    return chapter;
  } catch (error) {
    console.error("[GET_CURRENT_CHAPTER]", error);
    
  }
}
