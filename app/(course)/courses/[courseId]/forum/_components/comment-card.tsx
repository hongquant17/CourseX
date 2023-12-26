"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FileEdit, Heart, Pencil, Reply } from "lucide-react";
import { useTheme } from "next-themes";
import { Comment, Like } from "@prisma/client";
import { CommentItem } from "@/lib/constant";
import { IconBtn } from "./icon-btn";
import { useForum } from "./_contexts/forum-context";
import CommentList from "./comment-list";
import { useState } from "react";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
    hour12: true,
})

interface CommentProps{
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
    const  forumContext = useForum();
    const childComments = forumContext.getReplies(id);
    return (
        <>
        <div className="border-2 w-2/3 rounded-2xl">
        <div className="flex items-center m-2">
            <Avatar className="cursor-pointer transform transition-transform hover:scale-110 mr-4">
                    <AvatarImage src={(userAvatar) ? userAvatar: userSrc} />
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
                <IconBtn Icon={Heart} isActive={true} width={24}>
                    {likes.length}
                </IconBtn> 
                <IconBtn Icon={Reply} isActive={true} width={24}>
                    {null}
                </IconBtn>
                <IconBtn Icon={FileEdit} isActive={true} width={20}>
                    {null}
                </IconBtn>    
            </div>  
        </div>
        </div>

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
                <button onClick={() => setChildrenHidden(false)}>
                    Show Replies
                </button>
            </>
        )}
        </>
    )
}