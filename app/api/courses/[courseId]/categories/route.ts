import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { isAdminDB, isAdminSession } from '@/lib/admin';
import { isTeacherDB, isTeacherSession } from '@/lib/teacher';
import { Tag } from '@/components/ui/tag-input';

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

    const { categories, ...otherValues } = values;

    console.log(values)

    await db.courseCategory.deleteMany({
      where: {
        courseId: params.courseId,
      },
    });

    const updatedCourseCategories = await Promise.all(
      categories.map(async (category: Tag) => {
        const existingCategory = await db.category.findFirst({
          where: { id: category.id },
        });

        if (!existingCategory) {
          await db.category.create({
            data: {
              id: category.id,
              name: category.text,
            },
          });
        }

        return db.courseCategory.create({
          data: {
            categoryId: category.id,
            courseId: params.courseId,
          },
        });
        
      })
    );

    const updatedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        ...otherValues,
        categories: {
          connect: updatedCourseCategories.map((category) => ({ id: category.id })),
        },
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}