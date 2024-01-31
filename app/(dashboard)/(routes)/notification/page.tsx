import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { getNotification } from "@/actions/get-noti";
import Handlebars from "handlebars";
import { NotificationProps } from "@/lib/constant";

type NotiProps = NotificationProps & {
  id: string;
  createdAt: Date;
  readAt: Date | null;
}

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }
  const userId = session.user.uid;
  const notiResponse = await getNotification(userId);
  console.log(notiResponse);
  // const notiTemplate = Handlebars.compile("{{id}} liked your comment in {{courseId}}'s forum")
  return (
    <div className="p-6 space-y-4">
        {notiResponse?.slice().reverse().map((notiItem: NotiProps) => (
        <div key={notiItem.id} className="mb-4">
          <span>
            {/* {JSON.parse(JSON.stringify(notiItem.inObj)).id} */}
            {notiItem.inObj?.id}
          {/* {notiTemplate({id: notiItem.inObj?., commentId: "", courseId: notiItem.prObj.id})} */}
          </span>
        </div>
    ))}
    </div>
  )
}
