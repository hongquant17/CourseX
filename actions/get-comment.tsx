import { db } from "@/lib/db";
import { Comment } from "@prisma/client";

type CommentItem = Comment & {
    id: string; 
    content: string;
    parentId: string | null;
    userId: string | null;
    courseId: string;
    createdAt: Date; 
    updatedAt: Date; 
    isDeleted: boolean;
    likeNumber: number; 
};

type GetComment = {
  courseId: string;
};

export const getComment = async ({
  courseId,
}: GetComment): Promise<CommentItem[]> => {
  try {
    const comments = await db.comment.findMany({
      where: {
        courseId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const comment: CommentItem[] = comments.flatMap((comment) =>
      ({
        id: comment.id,
        userId: comment.userId || null,
        courseId: comment.courseId,
        parentId: comment.parentId || null,
        content: comment.content || "",
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        isDeleted: comment.isDeleted,
        likeNumber: comment.likeNumber,
      }));

    return comment;
  } catch (error) {
    console.error("[GET_COMMENT]", error);
    return [];
  }
};
