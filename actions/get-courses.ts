import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { rd } from "@/lib/redis";

type CourseWithProgressWithCategory = Course & {
  categories: Category[];
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    if (categoryId === undefined) {
      const keyData = "course:all";
      // const cachedData = await rd.get(keyData);

      // if (cachedData) {
      //   return cachedData;
      // }
      const courses = await db.course.findMany({
        where: {
          isPublished: true,
          title: {
            contains: title,
          },
        },
        include: {
          categories: {
            select: {
              category: true,
            },
          },
          chapters: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
          enrolls: {
            where: {
              userId,
              isAccepted: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const coursesWithProgress: CourseWithProgressWithCategory[] =
        await Promise.all(
          courses.map(async (course) => {
            if (course.enrolls.length === 0) {
              return {
                ...course,
                progress: null,
                categories: course.categories.map(
                  (category) => category.category
                ),
              };
            }

            const progressPercentage = await getProgress(userId, course.id);

            const formattedCategories: Category[] = course.categories.map(
              (courseCategory) => ({
                id: courseCategory.category.id,
                name: courseCategory.category.name,
                createdAt: courseCategory.category.createdAt,
                updatedAt: courseCategory.category.updatedAt,
              })
            );

            return {
              ...course,
              progress: progressPercentage,
              categories: formattedCategories,
            };
          })
        );

      return coursesWithProgress;
    } else {
      const category = await db.category.findUnique({
        where: {
          id: categoryId,
        },
        include: {
          Courses: {
            select: {
              course: true,
            },
          },
        },
      });

      const courseList: Course[] =
        category?.Courses?.map((course) => course.course) || [];

      const coursesWithProgress: (CourseWithProgressWithCategory | null)[] =
        await Promise.all(
          courseList.map(async (course) => {
            if (!course || course.isPublished === false) return null;

            const courseData = await db.course.findUnique({
              where: {
                id: course.id,
              },
              include: {
                categories: {
                  select: {
                    category: true,
                  },
                },
                chapters: {
                  where: {
                    isPublished: true,
                  },
                  select: {
                    id: true,
                  },
                },
                enrolls: {
                  where: {
                    userId,
                    isAccepted: true,
                  },
                },
              },
            });

            if (!courseData) return null;

            if (courseData.enrolls.length === 0) {
              return {
                ...courseData,
                progress: null,
                categories: courseData.categories.map(
                  (courseCategory) => courseCategory.category
                ),
              };
            }

            const progressPercentage = await getProgress(userId, course.id);

            const formattedCategories: Category[] = courseData.categories.map(
              (courseCategory) => ({
                id: courseCategory.category.id,
                name: courseCategory.category.name,
                createdAt: courseCategory.category.createdAt,
                updatedAt: courseCategory.category.updatedAt,
              })
            );

            return {
              ...courseData,
              progress: progressPercentage,
              categories: formattedCategories,
            } as CourseWithProgressWithCategory; // Ensure the correct type here
          })
        );

      // Filter out null values
      const filteredCoursesWithProgress = coursesWithProgress.filter(
        (course): course is CourseWithProgressWithCategory => course !== null
      );

      return filteredCoursesWithProgress;
    }
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
