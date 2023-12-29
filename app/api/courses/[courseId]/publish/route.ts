import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }, 
        categories: {
          include: {
            category: true,
          }
      }}
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedChapters = course.chapters.some((chapter) => chapter.isPublished);
    const hasCategories = (course.categories.length > 0);

    if (!course.title || !course.description || !course.imageUrl || !hasPublishedChapters || !hasCategories) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedCourse);

  } catch (error) {
    console.log("[QLKHGV_ADD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}