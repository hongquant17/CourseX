import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { isAdminSession } from "@/lib/admin";
import { isTeacherSession } from "@/lib/teacher";

const TeacherLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const session = await getSession();

    if (!isAdminSession(session?.user.role) && !isTeacherSession(session?.user.role)) {
        return redirect("/");
    }
    return <>{children}</>
}

export default TeacherLayout;