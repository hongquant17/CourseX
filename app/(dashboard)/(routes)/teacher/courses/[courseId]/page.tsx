
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import { Tag } from "@/components/ui/tag-input";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChapterForm } from "./_components/chapter-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Metadata } from "next";
import { Category } from "@prisma/client";
import { text } from "stream/consumers";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}) {
  let courseName = "";
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      categories: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (course) {
    courseName = course.title;
  }
  return {
    title: `${courseName} - Creation | CourseX`,
  };
}

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  const session = await getSession();
    
    if (!session) {
        return redirect("/");
    }

    const userId = session.user.uid;

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      categories: {
        include: {
          category: {
          },
        },
      },
    },
  });

  const courseCategoryTags: Tag[] = (course?.categories || []).map((item) => ({
    id: item.category.id,
    text: item.category.name
  }));

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    }
  });

  if (!course) {
    return redirect('/')
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    courseCategoryTags,
    course.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to students"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses`}
              className="w-fit flex items-center text-sm hover:opacity-75
                          transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course management
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Course Setup</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <Actions
                disabled={!isComplete}
                courseId={params.courseId}
                isPublished={course.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customization
              </h2>
            </div>
            <TitleForm
              initialData={course}
              courseId={course.id}
            />
            <DescriptionForm
              initialData={course}
              courseId={course.id}
            />
            <ImageForm
              initialData={course}
              courseId={course.id}
            />
            <CategoryForm
              courseCategoryTags={courseCategoryTags}
              courseId={course.id}
              option={categories.map((category)=> ({
                id: category.id,
                text: category.name,
              }))}
            />
          </div>
          <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h2 className="text-xl">
                    Chapters
                  </h2>
                </div>
                <ChapterForm
                  initialData={course}
                  courseId={course.id}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={File} />
                  <h2 className="text-xl">
                    Attachments
                  </h2>
                </div>
                <AttachmentForm
                  initialData={course}
                  courseId={course.id}
                />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default CourseIdPage;