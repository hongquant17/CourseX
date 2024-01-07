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
        const session = await getSession();
        if (!body?.ids || body?.ids.length === 0) {
            return NextResponse.json({ message: "Select an user to change." }, { status: 400 });
        }
        if (!isAdminSession(session?.user.role)) {
            return NextResponse.json({message: "YOU ARE NOT ADMINISTRATOR"}, {status: 403});
        }
        if (body?.type == TYPE_CHANGE["DELETE"]) {
          const deleteUsers = await db.user.deleteMany({
            where: {
              id: {
                in: body?.ids,
              },
            }
          });
          if (deleteUsers) return NextResponse.json({message: "User(s) deleted"}, {status: 200});
          else return NextResponse.json({message: "Delete operation failed"}, {status: 500});
        }
        const selectedUsers = await db.user.findMany({
          where: {
            id: {
              in: body?.ids,
            }
          },
          select: {
            id: true,
            role: true,
          }
        })
        
        if (body?.type == TYPE_CHANGE["ADMIN"]) {
          if (body?.ids.length > 1) {
            return NextResponse.json({message: "Please choose one user per admin privileges change."}, {status: 400})
          }
          selectedUsers.forEach(async user => {
            var newRole = "0,2";
            if (user.role) newRole = setCharAt(user.role, PRIVILEGES["ADMIN"], user.role[PRIVILEGES["ADMIN"]] == ROLES["ADMIN"] ? ROLES["NOT_ADMIN"] : ROLES["ADMIN"]) ?? "";
            const updateUsers = await db.user.update({
              where: {
                id: user.id,
              },
              data: {
                role: newRole,
              },
            })
            if (!updateUsers) return NextResponse.json({message: `Cannot change user ${user.id} role. Operation aborted`}, {status: 500});
          });
          return NextResponse.json({message: "Role changed"}, {status: 200});
        }
        
        selectedUsers.forEach(async user => {
          var newRole = "0,2";
          if (user.role) newRole = setCharAt(user.role, PRIVILEGES["OTHERS"], user.role[PRIVILEGES["OTHERS"]] == ROLES["TEACHER"] ? ROLES["USER"] : ROLES["TEACHER"]) ?? "";
          const updateUsers = await db.user.update({
            where: {
              id: user.id,
            },
            data: {
              role: newRole,
            },
          })
          if (!updateUsers) return NextResponse.json({message: `Cannot change user ${user.id} role. Operation aborted`}, {status: 500});
        });
        return NextResponse.json({message: "Role changed"}, {status: 200});

    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}