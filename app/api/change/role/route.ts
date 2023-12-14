import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const formData = body.formData;
        const session = await getSession();
        console.log(formData);
        if (!formData?.ids || formData?.ids.length === 0) {
            return NextResponse.json({ message: "Select an user to change." }, { status: 400 });
        }
        if (!isAdmin(session?.user.role)) {
            return NextResponse.json({message: "YOU ARE NOT ADMINISTRATOR"}, {status: 403});
        }

        const newRole = formData?.role;

        const updateUsers = await db.user.updateMany({
            where: {
              id: {
                in: formData?.ids,
              },
            },
            data: {
              role: newRole,
            },
          })
        
        if(!updateUsers) {
            return NextResponse.json({message: "Some thing failed"}, {status: 500});
        }
        return NextResponse.json({message: "All user changed role"}, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}