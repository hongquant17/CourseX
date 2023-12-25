"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Like } from "@prisma/client";
import { useTheme } from "next-themes";

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
    const isDarkMode = theme === 'dark'
    const userSrc = isDarkMode ? '/light-no-ava.png' : '/no-avatar.svg';
    return (
        <div>
        <div className="flex items-center">
            <Avatar className="cursor-pointer transform transition-transform hover:scale-110 mr-4">
                    <AvatarImage src={(userAvatar) ? userAvatar: userSrc} />
            </Avatar>
            <div>
                {userName}
            </div>
        </div>
        
        <div>
            {content}
        </div>

        </div>
    )
}