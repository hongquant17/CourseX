import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userData = body.formData;

        if (!userData?.email || !userData?.password) {
            return NextResponse.json({ message: "All field are required." }, { status: 400 });
        }

        const duplicate = await db.user.findUnique({
            where:{ 
                email: userData.email,
            },
        })
        
        if(duplicate) {
            return NextResponse.json({message: "Duplicate Email"}, {status: 409});
        }
        const hashPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashPassword;

        await db.user.create({
            data: userData,
        });
        return NextResponse.json({message: "User created."}, {status: 201});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}