import { db } from "@/lib/db";
import { Course, Enroll } from "@prisma/client";

type EnrollWithCourse = Enroll & {
  course: Course;
};

const groupByCourse = (enrolls: EnrollWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  enrolls.forEach((enroll) => {
    const courseTitle = enroll.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += 1; // numbers of students in each course
  })

  return grouped;
}

export const getAnalytics = async (userId: string) => {
  try {
    const enrolls = await db.enroll.findMany({
      where: {
        course: {
          userId: userId,
        }
      },
      include: {
        course: true,
      }
    });

    const distinctEnrolls = await db.enroll.findMany({
      where: {
        course: {
          userId: userId,
        }
      },
      distinct: ["courseId"],
    
    })

    const groupedEarnings = groupByCourse(enrolls);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalCourses = distinctEnrolls.length;
    const totalEnrollment = enrolls.length;

    return {
      data,
      totalCourses,
      totalEnrollment,
    };
    
  } catch (error) {
    console.log("[ANALYTIC]", error);
    return {
      data: [],
      totalCourses: 0,
      totalEnrollment: 0,
    }
  }
}