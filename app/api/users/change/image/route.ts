import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
export async function PATCH(
    req: Request,
  ) {
    try {
      const session = await getSession();
      const userId = session?.user.uid;
  
      const url = await req.json();
      if (!userId) {
        return NextResponse.json({ message: "Unauthorize"}, { status: 401 });
      }
      const newImage = await db.user.update({
        where: {
            id: userId,
        },
        data: {
            image: url.imageUrl,
        }
      });
      if (newImage) return NextResponse.json({message: "Changed image"}, {status: 200});
      return NextResponse.json({message: "Can not change user image"}, {status: 500});
    } catch (error) {
      console.log("[COURSE_CHAPTER_ID]", error);
      return NextResponse.json({ message: "Internal Error"}, { status: 500 });
    }
  }