import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getSession();
        const userId = session?.user.uid;
    
        if (!userId) {
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
    
        var body = await req.json();
        const userReceiveNoti = (body.diObj?.type === 'user' ? body.diObj : body.inObj)?.id ?? '';
        const createNoti = await db.notification.create({
            data: {
                userId: userReceiveNoti,
                type: body.type,
                readAt: null,
                subjectCount: Object.keys(body.subjects).length,
                subjects: body.subjects,
                directObj: body.diObj,
                inObj: body.inObj,
                prepObj: body.prObj,
            }
        });
        if (!createNoti) return NextResponse.json({message: "Cannot create noti"}, {status: 500});
        return NextResponse.json({message: "Notification created"}, {status: 200});

        
      } catch (error) {
        console.log("NOTIFICATION", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
      }
}

export async function GET(req: Request) {
    try {
        const session = await getSession();
        const userId = session?.user.uid;
    
        if (!userId) {
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const notiList = await db.notification.findMany({
            where: {
                userId: userId,
            }
        });
        if (notiList) return NextResponse.json(notiList);
        return NextResponse.json({message: "Cannot get notification"}, {status: 500});
        
      } catch (error) {
        console.log("NOTIFICATION", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
      }
}