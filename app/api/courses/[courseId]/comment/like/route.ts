import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
    req: Request,
) {
    try{
        const session = await getSession();
        const userId = session?.user.uid;
    
        if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const userIdLike = body.userId;
        const commentIdLike = body.commentId;
        const newLiked = await db.like.create({
            data: {
                userId: userIdLike,
                commentId: commentIdLike
            }
          });

        return NextResponse.json(newLiked);

    } catch (error) {
        console.log("FORUM_COMMENT", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}