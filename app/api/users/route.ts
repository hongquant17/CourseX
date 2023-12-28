import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";


export async function GET(
  req: Request,
) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;
    
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
    
    const userInfo = await db.user.findFirst({
        where: {
            id: userId,
        }
    });
    console.log(userInfo);
    if (userInfo) return NextResponse.json(userInfo);
    return NextResponse.json({ message: "Can not get user information"}, {status: 500});

  } catch (error) {
    console.log("[CHAPTER_ID_DELETE", error);
    return NextResponse.json({ message: "Internal Error"}, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;

    // prevent user set isPublished to True
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorizde"}, { status: 401 });
    }

  } catch (error) {
    console.log("[COURSE_CHAPTER_ID]", error);
    return NextResponse.json({ message: "Internal Error"}, { status: 500 });
  }
}
