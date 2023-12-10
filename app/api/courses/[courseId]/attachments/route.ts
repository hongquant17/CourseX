import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const session = await getSession();
        const userId = session?.user.uid;
        const role = session?.user.role;
        const { url } = await req.json();
        const isAuthorized = role == "admin" || role == "teacher";

        if (!userId || !isAuthorized) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const attachment = await db.attachment.create({
            data: {
                url, 
                name: url.split("/").pop(),
                courseId: params.courseId,
            }
        })

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("COURSE_ID_ATTACHMENT", error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}