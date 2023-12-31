import { isAdminDB, isAdminSession } from "@/lib/admin";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { isTeacherDB, isTeacherSession } from "@/lib/teacher";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string, attachmentId: string } }
) {
    try {
        const session = await getSession();
        const userId = session?.user.uid;
        const role = session?.user.role;
        var isAuthorized = isAdminSession(role) || isTeacherSession(role);
        if (!isAuthorized) {
            isAuthorized = await isAdminDB(userId) || await isTeacherDB(userId);
        }

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

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId
            }
        });

        return NextResponse.json(attachment);
    } catch(error) {
        console.log("ATTACHMENT ID", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}