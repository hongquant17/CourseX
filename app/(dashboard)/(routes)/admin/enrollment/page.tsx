import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
  
const UserPage = async () => {
  const session = await getSession();
    
    if (!session) {
        return redirect("/");
    }

    const userId = session.user.uid;

  return (
    <div>
      Enrollment
    </div>
  );
};

export default UserPage;
