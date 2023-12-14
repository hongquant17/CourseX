import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { isTeacher } from "@/lib/teacher";

const TeacherLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const session = await getSession();

    if (!isAdmin(session?.user.role) && !isTeacher(session?.user.role)) {
        return redirect("/");
    }
    return <>{children}</>
}

export default TeacherLayout;