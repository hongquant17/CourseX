import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        const userId = session?.user.uid;
        const role = session?.user.role

        const { title } = await req.json();
        const isAuthorized = role == "admin" || role == "teacher";

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