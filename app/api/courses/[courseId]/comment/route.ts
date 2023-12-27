import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const commentData = body.formData;
    const newComment = await db.comment.create({
      data: {
        userId: userId,
        content: commentData.comment,
        courseId: params.courseId,
        parentId: commentData.parentId,
      },
    });
    if (newComment)
      return NextResponse.json({ message: "Commented" }, { status: 200 });
  } catch (error) {
    console.log("FORUM_COMMENT", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const body = await req.json();
    const commentData = body;
    if (userId != commentData.userId) {
      return NextResponse.json(
        { message: "You do not have permission to edit this comment" },
        { status: 500 }
      );
    }
    const existedComment = await db.comment.findFirst({
      where: {
        id: commentData.commentId,
      },
    });
    if (!existedComment) {
      return NextResponse.json(
        { message: "Comment doesn't existed in DB" },
        { status: 500 }
      );
    }
    const newComment = await db.comment.update({
      where: {
        id: commentData.commentId,
      },
      data: {
        content: commentData.content,
      },
    });
    if (newComment)
      return NextResponse.json({ message: "Comment edited" }, { status: 200 });
    return NextResponse.json(
      { message: "Can not edit comment" },
      { status: 500 }
    );
  } catch (error) {
    console.log("FORUM_COMMENT", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
