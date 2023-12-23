import { ArrowLeft, File } from "lucide-react";

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

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
    const session = await getSession();
    
    if (!session) {
        return redirect("/");
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
        <Banner variant="success" label="Bạn đã hoàn thành chương học này." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="Bạn phải tham gia khoá học để học chương học này."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="md:items-center md:justify-center h-full px-3 pt-4">
          <Link
            href={`/search`}
            className="w-fit flex items-center text-sm hover:opacity-75
                          transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Trở về tìm kiếm khóa học
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
