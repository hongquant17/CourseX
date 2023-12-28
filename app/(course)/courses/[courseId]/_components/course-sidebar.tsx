import { db } from "@/lib/db";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import { getSession } from "@/lib/auth";

interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null; 
        })[]
    }; 
    progressCount: number;
}

export const CourseSidebar = async ({
    course, 
    progressCount,
}: CourseSidebarProps) => {
    const session = await getSession();
    if (!session) {
        return redirect("/auth/signin");
    }

    const userId = session.user.uid;

    const enroll = await db.enroll.findUnique({
        where: {
            userId_courseId: {
                userId, 
                courseId: course.id, 
            }
        }
    }); 

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">
                    {course.title}
                </h1>
                {enroll && ( progressCount >= 0 ? (
                    <div className="mt-10">
                        <CourseProgress
                            variant="success" 
                            value={progressCount}
                        /> 
                    </div>
                ): null)}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id} 
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id} 
                        isLocked={!chapter.isFree && !enroll}
                    /> 
                ))}
            </div>
        </div>
    )
}