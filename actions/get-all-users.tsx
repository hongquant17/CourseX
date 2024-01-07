import { db } from "@/lib/db";
import { User } from "@prisma/client";


export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await db.user.findMany({
      where: {},
      distinct: ["id"],
    });

    return users;
  } catch (error) {
    console.error("[GET_ALL_USERS]", error);
    return [];
  }
}