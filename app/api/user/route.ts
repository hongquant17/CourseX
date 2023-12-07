import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        const userData = body.formData;

        if(!userData?.email || !userData?.password) {
            return NextResponse.json({message: "All field are required."}, {status: 400});
        }

    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Error", error }, {status: 500});
    }
}