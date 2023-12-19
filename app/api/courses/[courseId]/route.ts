import { MuxData } from '@prisma/client';
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { getSession } from '@/lib/auth';
import { isAdminDB, isAdminSession } from '@/lib/admin';
import { isTeacherDB, isTeacherSession } from '@/lib/teacher';

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
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

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);

  } catch (error) {
    console.log("[QLCHGV_DEL]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;
    const role = session?.user.role;
    const values = await req.json();
    var isAuthorized = isAdminSession(role) || isTeacherSession(role);
    if (!isAuthorized) {
        isAuthorized = await isAdminDB(userId) || await isTeacherDB(userId);
    }

    if (!userId || !isAuthorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


