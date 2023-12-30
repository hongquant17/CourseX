import { PRIVILEGES, ROLES } from "./constant";
import { db } from "./db";

export const isTeacherDB = async (userId?: string | undefined) => {
    if (userId) {
      const existUser = await db.user.findUnique({
        where:{ 
            id: userId,
        },
      });
      const role = existUser?.role;
      if (role) {
        return role[PRIVILEGES["OTHERS"]] === String(ROLES["TEACHER"]);
      }
    }
    return false;
};

export const isTeacherSession = (sessionRole: string | null | undefined): boolean => {
  if (sessionRole) {
    return sessionRole[PRIVILEGES["OTHERS"]] === String(ROLES["TEACHER"]);
  }
  return false;
};