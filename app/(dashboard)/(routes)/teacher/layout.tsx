import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

const TeacherLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const session = await getSession();

    if (!session || (session.user.role !== "teacher" && session.user.role !== "admin")) {
        return redirect("/");
    }
    return <>{children}</>
}

export default TeacherLayout;