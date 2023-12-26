"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { Comment, Like } from "@prisma/client";
import { CommentItem } from "@/lib/constant";

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
    var areChildrenHidden = false;
    return (
        <>
        <div className="flex items-center">
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
        
        <div className="mb-10">
            <span>
            {content}
            </span>
            <div className="flex items-center">
                <Heart className="mr-1"/>
                {likes.length}
            </div>
            
        </div>

        {/* {childComments?.length && childComments?.length > 0 && (
            <>
                <div className={`${areChildrenHidden ? "hidden" : ""}`}>
                    <button aria-label="Hide Replies">
                    </button>
                    <div className="ml-10">
                    {childComments?.map((item) => (
                        <CommentCard key={item.id}
                        {...item}
                        childComments={null}
                        >
                        </CommentCard>
                    ))}
                    </div>
                </div>
            </>
        )}  */}

        </>
    )
}