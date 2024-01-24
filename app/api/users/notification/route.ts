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
        console.log(body);
        if (body.type == 'like') {
            const receiveUser = await db.comment.findFirst({
                where: {
                    id: body.receiveId,
                },
                select: {
                    user: true,
                }
            });
            body.receiveId = receiveUser?.user.id;
            body.inObj = {id: receiveUser?.user.id, name: receiveUser?.user.name, type: "user"};
        };
        
        const createNoti = await db.notification.create({
            data: {
                userId: body.receiveId,
                type: body.type,
                notiDataId: null,
                readAt: null,
            }
        });
        const dataNoti = await db.notificationData.create({
            data: {
                notiId: createNoti.id,
                subjectCount: Object.keys(body.subjects).length,
                subjects: body.subjects,
                inObj: body.inObj,
                prObj: body.prObj,
            }
        });

        const updateNoti = await db.notification.update({
            where: { id: createNoti.id },
            data: {
              notiDataId: dataNoti.id,
            },
        });
        if (!dataNoti) return NextResponse.json({message: "Cannot create noti"}, {status: 500});
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