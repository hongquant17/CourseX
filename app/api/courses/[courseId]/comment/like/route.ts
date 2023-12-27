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
        const existedLike = await db.like.findFirst({
            where: {
                userId: userIdLike,
                commentId: commentIdLike,
            }
        })
        if (existedLike) {
            const deletedLike = await db.like.delete({
                where: {
                    userId_commentId: {
                        userId: userIdLike,
                        commentId: commentIdLike
                    }
                }
            })
            if (deletedLike) {
                return new NextResponse("Deleted", {status: 200});
            }
        }
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