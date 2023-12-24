'use client'

import { usePathname } from "next/navigation";
import { Comment } from "@prisma/client";

type CommentItem = Comment & {
    id: string; 
    content: string;
    parentId: string | null;
    userId: string | null;
    courseId: string;
    createdAt: Date; 
    updatedAt: Date; 
    isDeleted: boolean;
    likeNumber: number; 
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
        <div key={item.id}>
            {item.content}
        </div>
    ))}
    </div>
    )
}