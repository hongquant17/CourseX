import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { isAdminSession } from "@/lib/admin";
import { PRIVILEGES, ROLES, TYPE_CHANGE } from "@/lib/constant";
import { setCharAt } from "@/lib/utils";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const formData = body.formData;
        const session = await getSession();
        console.log(formData);
        if (!formData?.ids || formData?.ids.length === 0) {
            return NextResponse.json({ message: "Select an user to change." }, { status: 400 });
        }
        if (!isAdminSession(session?.user.role)) {
            return NextResponse.json({message: "YOU ARE NOT ADMINISTRATOR"}, {status: 403});
        }

        var newRole = formData?.role;
        if (formData?.type == TYPE_CHANGE["DELETE"]) {
          const deleteUsers = await db.user.deleteMany({
            where: {
              id: {
                in: formData?.ids,
              },
            }
          });
          if (deleteUsers) return NextResponse.json({message: "User(s) deleted"}, {status: 200});
          else return NextResponse.json({message: "Delete operation failed"}, {status: 500});
        }
        if (formData?.type == TYPE_CHANGE["ADMIN"]) {
          if (formData?.ids.length > 1) {
            return NextResponse.json({message: "Please choose one user per admin privileges change."}, {status: 400})
          }
          newRole = setCharAt(newRole, PRIVILEGES["ADMIN"], newRole[PRIVILEGES["ADMIN"]] == ROLES["ADMIN"] ? ROLES["NOT_ADMIN"] : ROLES["ADMIN"]);
        }
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
            return NextResponse.json({message: "Something failed"}, {status: 500});
        }
        return NextResponse.json({message: "All user changed role"}, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}