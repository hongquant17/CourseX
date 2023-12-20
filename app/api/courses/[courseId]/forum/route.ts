import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isAdminDB, isAdminSession } from "@/lib/admin";
import { isTeacherDB, isTeacherSession } from "@/lib/teacher";


export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
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

    

  } catch (error) {
    console.log("[CHAPTER_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
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
      return new NextResponse("Unauthorizde", { status: 401 });
    }

  } catch (error) {
    console.log("[COURSE_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
