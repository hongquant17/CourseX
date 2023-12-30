import { ROLES, PRIVILEGES } from "./constant";
import { db } from "./db";


export const isAdminDB = async (userId?: string | undefined) => {
  if (userId) {
    const existUser = await db.user.findUnique({
      where:{ 
          id: userId,
      },
    });
    const role = existUser?.role;
    if (role) {
      return role[PRIVILEGES["ADMIN"]] === String(ROLES["ADMIN"]);
    }
  }
  return false;
};
export const isAdminSession = (sessionRole: string | null | undefined): boolean => {
  if (sessionRole) {
    return sessionRole[PRIVILEGES["ADMIN"]] === String(ROLES["ADMIN"]);
  }
  return false;
}

