import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { utapi } from "@/lib/utils";
export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;

    const url = await req.json();
    // Have to modify database to store fileKey
    // if (url.preKey != "") {
    //   utapi.deleteFiles(url.preKey);
    //   console.log("Old image deleted!");
    // }
    if (!userId) {
      return NextResponse.json({ message: "Unauthorize" }, { status: 401 });
    }
    const newImage = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        image: url.imageUrl,
      },
    });
    if (newImage)
      return NextResponse.json({ message: "Changed image" }, { status: 200 });
    return NextResponse.json(
      { message: "Can not change user image" },
      { status: 500 }
    );
  } catch (error) {
    console.log("[COURSE_CHAPTER_ID]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
