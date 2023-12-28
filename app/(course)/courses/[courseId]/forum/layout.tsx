import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import { getSession } from "@/lib/auth";
import { CourseNavbar } from "../_components/course-navbar";
import { CourseSidebar } from "../_components/course-sidebar";

const CourseLayout = async ({
    children, 
    params
}: {
    children: React.ReactNode
    params: { courseId: string  }; 
}) => {

    const session = await getSession();
    
    if (!session) {
        return redirect("/auth/signin");
    }

    const userId = session.user.uid;

    const course = await db.course.findUnique({
      where: {
        id: params.courseId, 
      }, 
      include: {
        chapters: {
            where: {
                isPublished: true
            }, 
            include: {
                userProgress: {
                    where: {
                        userId, 
                    }
                }
            }, 
            orderBy: {
                position: "asc"
            }
        },
      },
    }); 

    if (!course) {
        return redirect("/"); 
    }

    const progressCount = -1;

    return ( 
        <div className="h-full">
            <div className="h-[80px] fixed inset-y-0 w-full z-50">
                <CourseNavbar
                    course={course} 
                    progressCount={progressCount}
                    isForum={true}
                />
            </div>
            <main className="pt-[80px] h-full">
                {children}

            </main>
        </div>
     );
}
 
export default CourseLayout;