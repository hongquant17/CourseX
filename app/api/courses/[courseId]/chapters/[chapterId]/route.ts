import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = auth()
        
        // prevent user set isPublished to True
        const { isPublished, ...values } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorizde", { status: 401});
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        })

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                ...values,
            }
        });

        // TODO: Handle Video Upload

        return NextResponse.json(chapter);

    } catch (error) {
        console.log("[COURSE_CHAPTER_ID]", error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}