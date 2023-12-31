import { isAdminSession, isAdminDB } from "@/lib/admin";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { isTeacherSession, isTeacherDB } from "@/lib/teacher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        const userId = session?.user.uid;
        const role = session?.user.role;

        const { title } = await req.json();
        var isAuthorized = isAdminSession(role) || isTeacherSession(role);
        if (!isAuthorized) {
            isAuthorized = await isAdminDB(userId) || await isTeacherDB(userId);
        }

        if (!userId || !isAuthorized) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.create({
            data: {
                userId,
                title
            }
        });

        return NextResponse.json(course);

    } catch (error) {
        console.log("[COURSE]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}