import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userData = body.formData;
        if (!userData?.email || !userData?.current || !userData?.now) {
            return NextResponse.json({ message: "All field are required." }, { status: 400 });
        }

        const existUser = await db.user.findUnique({
            where:{ 
                email: userData.email,
            },
        })
        
        if(!existUser) {
            return NextResponse.json({message: "User not exist"}, {status: 409});
        }
        if (existUser.password != null) {
            const match = await bcrypt.compare(userData?.current!, existUser.password);
            if (match && userData.now != '') {
                const newPass = await bcrypt.hash(userData.now, 10);
                console.log(newPass);
                const setNewPass = await db.user.update({
                    where:{ 
                        email: userData.email,
                    },
                    data: {
                        password: newPass,
                      },
                });
                if (setNewPass) return NextResponse.json({message: "Password changed."}, {status: 201});
                return NextResponse.json({message: "Can not change password"}, {status: 500});
            }
            return NextResponse.json({message: "Current password don't match or new password is empty"}, {status: 400});
        }
        return NextResponse.json({message: "User does not have password because you sign in with Github or Google"}, {status: 400});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}