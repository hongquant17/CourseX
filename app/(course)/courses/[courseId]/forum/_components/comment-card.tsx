"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileEdit, Heart, Reply } from "lucide-react";
import { Like } from "@prisma/client";
import { IconBtn } from "./icon-btn";
import { useForum } from "./_contexts/forum-context";
import CommentList from "./comment-list";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CommentForm from "./comment-form";
import toast from "react-hot-toast";
import { toast as notiToast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { isAdminDB } from "@/lib/admin";
import { isTeacherDB } from "@/lib/teacher";
import { getRole } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { NotificationProps } from "@/lib/constant";
import { useSocket } from "@/components/providers/socket/socket-provider";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
  // hour12: true,
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
  courseOwner: string;
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
  courseOwner,
  likes,
}: CommentProps) => {

  const [areChildrenHidden, setChildrenHidden] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { socket, isConnected } = useSocket();
  
  const roleUser = getRole(userRole);
  const ownCourse = courseOwner == userId;
  const forumContext = useForum();
  const childComments = forumContext.getReplies(id);
  const likedComment = likes.filter(
    (obj) => obj.userId === forumContext.userId
  );

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
      if (response.message === "Liked") {
        socket.emit("like:comment", "Dep trai khoai to");
        var newNoti : NotificationProps = { 
          type: 'like',
          subjectCount: 1,
          subjects: [{ id: forumContext.userId, name: forumContext.userName ? forumContext.userName : '', type: 'user' }],
          inObj: { id: id },
          prObj: { id: forumContext.courseId, type: "course" },
          receiveId: id,
      }
        const pushNoti = await fetch(`/api/users/notification`, {
          method: "POST",
          body: JSON.stringify(newNoti),
          headers,
        })
      };
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
      setContent("");
      toast.success(response.message);
      router.refresh();
    }
  };
  return (
    <>
      <Card className="w-[900px] mb-1 border-4">
        <CardHeader>
          <CardTitle className="flex justify-start items-center">
            <Avatar className="cursor-pointer transform transition-transform hover:scale-110 mr-4">
              <AvatarImage src={userAvatar ? userAvatar : undefined} />
              <AvatarFallback>X</AvatarFallback>
            </Avatar>
            <div className="justify-between flex-col">
              <div className="flex justify-center items-center mb-2">
                <span className="mr-10"> {userName} </span>
                <span>{dateFormatter.format(createdAt)}</span>
              </div>
              {!ownCourse && (
                <span
                  className={`text-xs ${
                    roleUser == "ADMIN" ? "text-red-500" : "text-yellow-400"
                  }`}
                >
                  {roleUser}
                </span>
              )}
              {ownCourse && (
                <span className={`text-xs text-lime-500`}>
                  Course&apos;s teacher
                </span>
              )}
            </div>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div>
              <form onSubmit={handleSubmit}>
                <Textarea
                  value={contentValue}
                  onChange={handleChange}
                  className="mb-4"
                >
                  {content}
                </Textarea>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          ) : (
            <span className="ml-10 mb-10">{content}</span>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex">
            <IconBtn
              Icon={Heart}
              isActive={false}
              isHidden={false}
              width={24}
              onClick={() => handleLikeSubmit()}
              isFill={likedComment.length != 0}
            >
              {likes.length}
            </IconBtn>
            <IconBtn
              Icon={Reply}
              isActive={isReplying}
              isHidden={false}
              width={24}
              onClick={() => setIsReplying((prev) => !prev)}
              isFill={false}
            >
              {null}
            </IconBtn>
            <IconBtn
              Icon={FileEdit}
              isActive={isEditing}
              isHidden={userId != forumContext.userId}
              width={20}
              onClick={() => setIsEditing((prev) => !prev)}
              isFill={false}
            >
              {null}
            </IconBtn>
          </div>
        </CardFooter>
      </Card>

      {isReplying && (
        <div className="mt-1 ml-10">
          <CommentForm parentId={id} />
        </div>
      )}

      {childComments?.length && childComments?.length > 0 && (
        <>
          <div className={`${areChildrenHidden ? "hidden" : ""}`}>
            <button onClick={() => setChildrenHidden(true)} className="mb-2 text-sm underline">
              Hide Replies
            </button>
            <div className="pl-10 border-l-2">
              <CommentList items={childComments}></CommentList>
            </div>
          </div>
          {areChildrenHidden && (
            <button onClick={() => setChildrenHidden(false)} className="mb-4 text-sm ml-4">
              Show Replies
            </button>
          )}
        </>
      )}
    </>
  );
};
