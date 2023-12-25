'use client'
import { Comment, Like } from "@prisma/client";
import { CommentCard } from "./comment-card";

type CommentItem = Comment & {
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
};

interface ForumProps{
    items: CommentItem[];
}


export default function Forum({
    items,
}: ForumProps) {
    return (
    <div>
    {items.map((item) => (
        <CommentCard key={item.id}
        {...item}
        >

        </CommentCard>
    ))}
    </div>
    )
}