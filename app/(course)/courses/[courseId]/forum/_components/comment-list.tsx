'use client'
import { Comment, Like } from "@prisma/client";
import { CommentCard } from "./comment-card";
import { CommentItem } from "@/lib/constant";

export interface CommentListProps {
    items: CommentItem[];
}

export default function CommentList({
    items,
}: CommentListProps) {
    return (
    <div className="mb-10">
    {items.map((item) => (
        <CommentCard key={item.id}
        {...item}
        >
        </CommentCard>
    ))}
    </div>
    )
}