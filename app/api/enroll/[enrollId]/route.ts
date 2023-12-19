import { isAdmin } from "@/lib/admin";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(
    req: Request,
    { params }: { params: { enrollId: string } }
) {
    try {
        const session = await getSession();
        const userId = session?.user.uid;
        const role = session?.user.role;

        const isAuthorized = isAdmin(role, userId) || isTeacher(role, userId);

        if (!userId || !isAuthorized) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedEnroll = await db.enroll.update({
            where: {
                id: params.enrollId,
            },
            data: {
                isAccepted: true,
            },
        });

        return NextResponse.json(updatedEnroll);

    } catch (error) {
        console.log("ENROLL_APPROVE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}