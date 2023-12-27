"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FileEdit, Heart, Reply } from "lucide-react";
import { useTheme } from "next-themes";
import { Like } from "@prisma/client";
import { IconBtn } from "./icon-btn";
import { useForum } from "./_contexts/forum-context";
import CommentList from "./comment-list";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CommentForm from "./comment-form";
import toast from "react-hot-toast";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
  hour12: true,
});

interface CommentProps {
  id: string;
  content: string;
  parentId: string | null;
  userId: string | null;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  likes: Like[];
  userName: string | null;
  userAvatar: string | null;
  userRole: string | null;
}

export const CommentCard = ({
  id,
  content,
  parentId,
  userId,
  userAvatar,
  userName,
  userRole,
  courseId,
  createdAt,
  updatedAt,
  isDeleted,
  likes,
}: CommentProps) => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const userSrc = isDarkMode ? "/light-no-ava.png" : "/no-avatar.svg";

  const [areChildrenHidden, setChildrenHidden] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [isLiked, setLiked] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const forumContext = useForum();
  const childComments = forumContext.getReplies(id);

  const router = useRouter();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const handleLikeSubmit = async () => {
    const res = await fetch(
      `/api/courses/${forumContext.courseId}/comment/like`,
      {
        method: "POST",
        body: JSON.stringify({ userId: forumContext.userId, commentId: id }),
        headers,
      }
    );
    const response = await res.json();
    if (!res.ok) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      router.refresh();
    }
  };

  const [contentValue, setContent] = useState<string>(content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setContent(value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/courses/${forumContext.courseId}/comment`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: userId,
        commentId: id,
        content: contentValue,
      }),
      headers,
    });
    const response = await res.json();
    if (!res.ok) {
      toast.error(response.message);
      setContent(content);
      setIsEditing(false);
    } else {
      setIsEditing(false);
      toast.success(response.message);
      router.refresh();
    }
  };
  return (
    <>
      <div className="border-2 rounded-2xl">
        <div className="flex items-center m-2">
          <Avatar className="cursor-pointer transform transition-transform hover:scale-110 mr-4">
            <AvatarImage src={userAvatar ? userAvatar : userSrc} />
          </Avatar>
          <div className="flex justify-between">
            <span className="mr-10"> {userName} </span>
            <span>{dateFormatter.format(createdAt)}</span>
          </div>
        </div>

        <div className="">
          {isEditing ? (
            <div>
              <form onSubmit={handleSubmit}>
                <textarea value={contentValue} onChange={handleChange}>
                  {content}
                </textarea>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <span className="ml-10 mb-10">{content}</span>
          )}
          <div className="flex">
            <IconBtn
              Icon={Heart}
              isActive={false}
              isHidden={false}
              width={24}
              onClick={() => handleLikeSubmit()}
            >
              {likes.length}
            </IconBtn>
            <IconBtn
              Icon={Reply}
              isActive={isReplying}
              isHidden={false}
              width={24}
              onClick={() => setIsReplying((prev) => !prev)}
            >
              {null}
            </IconBtn>
            <IconBtn
              Icon={FileEdit}
              isActive={false}
              isHidden={userId != forumContext.userId}
              width={20}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {null}
            </IconBtn>
          </div>
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-10">
          <CommentForm parentId={id} />
        </div>
      )}

      {childComments?.length && childComments?.length > 0 && (
        <>
          <div className={`${areChildrenHidden ? "hidden" : ""}`}>
            <button onClick={() => setChildrenHidden(true)}>
              Hide Replies
            </button>
            <div className="ml-10">
              <CommentList items={childComments}></CommentList>
            </div>
          </div>
          {areChildrenHidden && (
            <button onClick={() => setChildrenHidden(false)}>
              Show Replies
            </button>
          )}
        </>
      )}
    </>
  );
};
