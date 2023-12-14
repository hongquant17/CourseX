import { ROLES, PRIVILEGES } from "./constant";
import { db } from "./db";


export const isAdmin = async (sessionRole: string | null | undefined, userId?: string | undefined) => {
  if (sessionRole) {
    return sessionRole[PRIVILEGES["ADMIN"]] === String(ROLES["ADMIN"]);
  }
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

