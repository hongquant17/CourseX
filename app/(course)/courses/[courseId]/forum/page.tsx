import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Forum from "./_components/forum";
import { headers } from 'next/headers';
import { getComment } from "@/actions/get-comment";



export default async function ForumPage() {
    const headersList = headers();
    const header_url = headersList.get('x-url') || "";
    const courseId = header_url.split('/')[4];

    const commentList = await getComment({courseId});
    console.log(commentList);
    return (
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        </div>
        <Forum
            items={commentList}
        />
      </div>
    )
  }