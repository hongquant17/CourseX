import { PRIVILEGES, ROLES } from "./constant";
import { db } from "./db";

export const isTeacher = async (sessionRole: string | null | undefined, userId?: string | undefined) => {

    if (sessionRole) {
        return sessionRole[PRIVILEGES["OTHERS"]] === String(ROLES["TEACHER"]);
      }
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
}