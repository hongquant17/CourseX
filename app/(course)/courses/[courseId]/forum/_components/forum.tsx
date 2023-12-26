'use client'
import { Comment, Like } from "@prisma/client";
import { CommentCard } from "./comment-card";
import { useMemo } from "react";
import { useForum } from "./_contexts/forum-context";
import CommentList from "./comment-list";

export default function Forum() {
    const  forumContext = useForum();
    var rootComments = forumContext.rootComments;
    return (
    <div>
        {rootComments != null && rootComments.length > 0 && (
            <div>
                <CommentList items={rootComments}></CommentList>
            </div>
        )}
    </div>
    )
}