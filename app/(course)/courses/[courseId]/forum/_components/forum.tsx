'use client'
import { Comment, Like } from "@prisma/client";
import { CommentCard } from "./comment-card";
import { useMemo } from "react";

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

    const commentsByParentId = useMemo<{ [key: string]: CommentItem[] }>(
        () => {
          const group: { [key: string]: CommentItem[] } = {};
      
          items.forEach((item: CommentItem) => {
            const parentId = item.parentId ?? ''; // Use nullish coalescing operator
            group[parentId] = group[parentId] || [];
            group[parentId].push(item);
          });
      
          return group;
        },
        [items]
      );
    
    function getReplies(parentId: string) {
        return commentsByParentId[parentId];
    }

    return (
    <div>
    {commentsByParentId[''].map((item) => (
        <CommentCard key={item.id}
        {...item}
        childComments={getReplies(item.id)}
        >
        </CommentCard>
    ))}
    </div>
    )
}