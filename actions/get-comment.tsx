import { CommentItem } from "@/lib/constant";
import { db } from "@/lib/db";
import { Comment, Like } from "@prisma/client";


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
      include: {
        user: {
          select: {
            image: true,
            name: true,
            role: true,
          }
        },
        likes: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const comment: CommentItem[] = comments.flatMap((comment) =>
      ({
        id: comment.id,
        userId: comment.userId,
        courseId: comment.courseId,
        parentId: comment.parentId || null,
        content: comment.content || "",
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        isDeleted: comment.isDeleted,
        likes: comment.likes,
        userName: comment.user.name || null,
        userAvatar: comment.user.image || null,
        userRole: comment.user.role || null,
      }));

    return comment;
  } catch (error) {
    console.error("[GET_COMMENT]", error);
    return [];
  }
};
