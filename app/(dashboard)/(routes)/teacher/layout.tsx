import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { isTeacherSession } from "@/lib/teacher";

const TeacherLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const session = await getSession();

    if (!isTeacherSession(session?.user.role)) {
        return redirect("/");
    }
    return <>{children}</>
}

export default TeacherLayout;