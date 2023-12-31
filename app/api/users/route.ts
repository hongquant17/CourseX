import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userInfo = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (userInfo) return NextResponse.json(userInfo);
    return NextResponse.json(
      { message: "Can not get user information" },
      { status: 500 }
    );
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    const userId = session?.user.uid;

    var newData = await req.json();
    newData = newData.formData;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorize" }, { status: 401 });
    }
    const existUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!existUser) {
      return NextResponse.json({ message: "User not exist" }, { status: 409 });
    }

    const duplicateUsername = await db.user.findFirst({
      where: {
        username: newData.username,
      },
    });

    const duplicatePhone = await db.user.findFirst({
      where: {
        phone: newData.phone,
      },
    });

    if (duplicatePhone) {
      if (duplicatePhone.id != userId)
        return NextResponse.json(
          { message: "Phone number already in use" },
          { status: 500 }
        );
    }

    if (duplicateUsername) {
      if (duplicateUsername.id != userId)
        return NextResponse.json(
          { message: "Username already in use" },
          { status: 500 }
        );
    }

    const changeUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: newData.name,
        email: newData.email,
        phone: newData.phone,
        username: newData.username,
      },
    });
    var changedPass = false;
    if (existUser.password == null && newData?.old_pass === "") {
      const newPass = await bcrypt.hash(newData.new_pass, 10);
      const setNewPass = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          password: newPass,
        },
      });
      if (setNewPass) changedPass = true;
    }
    if (existUser.password != null && newData?.old_pass != "") {
      const match = await bcrypt.compare(
        newData?.old_pass!,
        existUser.password
      );
      if (match && newData.new_pass != "") {
        const newPass = await bcrypt.hash(newData.new_pass, 10);
        const setNewPass = await db.user.update({
          where: {
            id: userId,
          },
          data: {
            password: newPass,
          },
        });
        if (setNewPass) changedPass = true;
      }
    }
    if (!changeUser)
      return NextResponse.json(
        { message: "Can not change user information" },
        { status: 500 }
      );

    if (!changedPass && newData?.old_pass != "") {
      if (changeUser) {
        return NextResponse.json(
          { message: "Changed user information but not user password" },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: "Can not change user password" },
        { status: 500 }
      );
    }
    if (newData?.new_pass == "" && newData?.old_pass != "") {
      return NextResponse.json(
        { message: "New password must not be empty" },
        { status: 400 }
      );
    }
    if (existUser.password == null && newData.old_pass != "") {
      return NextResponse.json(
        {
          message:
            "You signed in with Github or Google, leave the old password empty",
        },
        { status: 400 }
      );
    }

    if (changedPass) {
      return NextResponse.json(
        { message: "Password and information changed" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Infomation changed" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[USER_INFORMATION]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
