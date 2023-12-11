import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += 1; // numbers of students in each course
  })

  return grouped;
}

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        }
      },
      include: {
        course: true,
      }
    });

    const distinctPurchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        }
      },
      distinct: ["courseId"],
    
    })

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalCourses = distinctPurchases.length;
    const totalEnrollment = purchases.length;

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