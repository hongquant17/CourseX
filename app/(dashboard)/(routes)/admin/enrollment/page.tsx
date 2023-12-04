import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const UserPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  return (
    <div>
      Enrollment
    </div>
  );
};

export default UserPage;
