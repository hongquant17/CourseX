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
                courseId: params.courseId
            }
          });

        return NextResponse.json(newComment);

    } catch (error) {
        console.log("FORUM_COMMENT", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}