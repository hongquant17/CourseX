import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";


export async function GET(
  req: Request,
) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;
    
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized"}, { status: 401 });
    }
    
    const userInfo = await db.user.findFirst({
        where: {
            id: userId,
        }
    });
    if (userInfo) return NextResponse.json(userInfo);
    return NextResponse.json({ message: "Can not get user information"}, {status: 500});

  } catch (error) {
    console.log("[CHAPTER_ID_DELETE", error);
    return NextResponse.json({ message: "Internal Error"}, { status: 500 });
  }
}
