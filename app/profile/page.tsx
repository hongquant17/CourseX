import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Profile } from "./_components/profile";
import toast from "react-hot-toast";
import { db } from "@/lib/db";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }
  const userId = session.user.uid;
  const userInfo = await db.user.findFirst({
    where: {
        id: userId,
    }
});
  return (
    <div className="flex justify-center items-center p-10">
      <Profile userData={userInfo} />
    </div>
  );
}
