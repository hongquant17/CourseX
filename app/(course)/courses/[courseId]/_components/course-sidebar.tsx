import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";
import { CourseSideBarItem } from "./course-sidebar-item";

interface CourseSideBarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null; 
        })[]
    }; 
    progressCount: number;
}

export const CourseSideBar = async ({
    course, 
    progressCount,
}: CourseSideBarProps) => {
    const { userId } = auth(); 

    if (!userId) {
        return redirect("/");
    }

    const purchase = await db.purchase.findUnique({
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
                {/* Check purchase and add progress */}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSideBarItem
                        key={chapter.id}
                        id={chapter.id} 
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id} 
                        isLocked={!chapter.isFree && !purchase}
                    /> 
                ))}
            </div>
        </div>
    )
}