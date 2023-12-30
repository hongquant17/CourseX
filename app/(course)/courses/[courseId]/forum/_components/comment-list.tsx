'use client'
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
    {items.slice().reverse().map((item) => (
        <div key={item.id} className="mb-4">
        <CommentCard {...item}
        >
        </CommentCard>
        </div>
    ))}
    </div>
    )
}