import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { getNotification } from "@/actions/get-noti";
import Handlebars from "handlebars";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }
  const userId = session.user.uid;
  const notiResponse = await getNotification(userId);
  const notiTemplate = Handlebars.compile("{{id}} liked your comment({{commentId}}) in course's forum {{courseId}}")
  console.log(notiResponse);
  
  return (
    <div className="p-6 space-y-4">
        {notiResponse?.slice().reverse().map((notiItem) => (
        <div key={notiItem.id} className="mb-4">
          <span>
          {notiTemplate({id: notiItem.inObj.id, commentId: "", courseId: notiItem.prObj.id})}
          </span>
        </div>
    ))}
    </div>
  )
}
