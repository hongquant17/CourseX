export const isTeacher = (userId?: string | null) => {
    return userId === process.env.NEXT_PUBLIC_TEACHER_ID
}

// import { db } from "./db";

// export const isTeacher = async (userId?: string | null) => {
//   const adminUsers = await db.users.findMany({
//     where: {
//       isTeacher: true,
//     },
//     distinct: ["userId"],
//   });

//   // Check if any adminUser has the specified userId
//   const isTeacher = adminUsers.some((adminUser) => adminUser.userId === userId);

//   return isTeacher && userId !== undefined; // Add this condition
// };