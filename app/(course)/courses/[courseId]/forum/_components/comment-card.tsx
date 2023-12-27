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

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
    hour12: true,
})

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
    const isDarkMode = theme === 'dark';
    const userSrc = isDarkMode ? '/light-no-ava.png' : '/no-avatar.svg';

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
        const res = await fetch(`/api/courses/${forumContext.courseId}/comment/like`, {
            method: "POST",
            body: JSON.stringify({ userId: forumContext.userId, commentId: id }),
            headers,
        });
        if (!res.ok) {
            const response = await res.json();
        } else {
            router.refresh();
        }
    };
    return (
        <>
            <div className="border-2 rounded-2xl">
                <div className="flex items-center m-2">
                    <Avatar className="cursor-pointer transform transition-transform hover:scale-110 mr-4">
                        <AvatarImage src={(userAvatar) ? userAvatar : userSrc} />
                    </Avatar>
                    <div className="flex justify-between">
                        <span className="mr-10"> {userName} </span>
                        <span>
                            {dateFormatter.format(createdAt)}
                        </span>
                    </div>
                </div>

                <div className="">
                    <span className="ml-10 mb-10">
                        {content}
                    </span>
                    <div className="flex">
                        <IconBtn Icon={Heart} isActive={false} width={24} onClick={() => handleLikeSubmit()}>
                            {likes.length}
                        </IconBtn>
                        <IconBtn Icon={Reply} isActive={isReplying} width={24} onClick = {() => setIsReplying(prev => !prev)}>
                            {null}
                        </IconBtn>
                        {/* <IconBtn Icon={FileEdit} isActive={true} width={20}>
                            {null}
                        </IconBtn> */}
                    </div>
                </div>
            </div>
            {isReplying && (
                <div className="mt-1 ml-10">
                    <CommentForm parentId={id}/>
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
                    {(areChildrenHidden) && <button onClick={() => setChildrenHidden(false)}>
                        Show Replies
                    </button>}
                </>
            )}
        </>
    )
}