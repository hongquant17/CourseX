import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const userIdLike = body.userId;
    const commentIdLike = body.commentId;
    const existedLike = await db.like.findFirst({
      where: {
        userId: userIdLike,
        commentId: commentIdLike,
      },
    });
    if (existedLike) {
      const deletedLike = await db.like.delete({
        where: {
          userId_commentId: {
            userId: userIdLike,
            commentId: commentIdLike,
          },
        },
      });
      if (deletedLike) {
        return NextResponse.json({ message: "Unliked" }, { status: 200 });
      }
      return NextResponse.json({ message: "Cannot unlike" }, { status: 500 });
    }
    const newLiked = await db.like.create({
      data: {
        userId: userIdLike,
        commentId: commentIdLike,
      },
    });
    if (newLiked)
      return NextResponse.json({ message: "Liked" }, { status: 200 });
  } catch (error) {
    console.log("LIKE", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
