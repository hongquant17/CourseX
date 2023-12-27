import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try{
        const session = await getSession();
        const userId = session?.user.uid;
    
        if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const commentData = body.formData;
        const newComment = await db.comment.create({
            data: {
                userId: userId,
                content: commentData.comment,
                courseId: params.courseId,
                parentId: commentData.parentId,
            }
          });

        return NextResponse.json(newComment);

    } catch (error) {
        console.log("FORUM_COMMENT", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try{
        const session = await getSession();
        const userId = session?.user.uid;
    
        if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const commentData = body;
        console.log(commentData);
        const existedComment = await db.comment.findFirst({
            where: {
                id: commentData.commentId,
            }
        })
        if (!existedComment) {
            return new NextResponse("Comment doesn't existed in DB", {status: 500});
        }
        const newComment = await db.comment.update({
            where: {
                id: commentData.commentId,
            },
            data: {
                content: commentData.content,
            }
          });
        if (newComment) return new NextResponse("Comment edited", {status: 200});
        return new NextResponse("Can not edit comment", {status: 500});

    } catch (error) {
        console.log("FORUM_COMMENT", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}