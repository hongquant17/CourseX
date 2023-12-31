import Forum from "./_components/forum";
import { headers } from 'next/headers';
import { getComment } from "@/actions/get-comment";
import { ForumProvider } from "./_components/_contexts/forum-context";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";




export default async function ForumPage() {
  const headersList = headers();
  const header_url = headersList.get('x-url') || "";
  const courseId = header_url.split('/')[4];

  const commentList = await getComment({ courseId });

  const session = await getSession();
  const userId = session?.user.uid;

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Link
        href={`/courses/${courseId}`}
        className="w-fit flex items-center text-sm hover:opacity-75
                          transition mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to course
      </Link>
      </div>
      <ForumProvider items={commentList} courseId={courseId} userId={userId}>
        <Forum />
      </ForumProvider>
    </div>
  )
}