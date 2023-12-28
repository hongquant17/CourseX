import { ArrowLeft, ArrowRight, File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { Metadata } from "next";
import { db } from "@/lib/db";

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
      category: {
        select: {
          name: true,
        },
        where: {},
      },
    },
  });
  if (course) {
    courseName = course.title;
  }
  return {
    title: `${courseName} - Details | CourseX`,
  };
}

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
    const session = await getSession();
    
    if (!session) {
        return redirect("/auth/signin");
    }

    const userId = session.user.uid;

    const {
        chapter,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        enroll,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });


  if (!chapter) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !enroll;
  const completeOnEnd = !!enroll && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You have completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You have to enroll in this course to access this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className=" justify-between flex h-full px-3 pt-4">
          <Link
            href={`/search/overview/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75
                          transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course overview
          </Link>

          <Link
            href={`/courses/${params.courseId}/forum`}
            className="flex items-center text-sm hover:opacity-75
                          transition"
          >
            Discussion Forum 
            <ArrowRight className="h-4 w-4 ml-2" />            
          </Link>

          <Link
            href={`/courses/${params.courseId}/forum`}
            className="flex items-center text-sm hover:opacity-75
                          transition"
          >
            Discussion Forum 
            <ArrowRight className="h-4 w-4 ml-2" />            
          </Link>
        </div>
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {enroll ? (<CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
