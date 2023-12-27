'use client'
import { CommentItem } from "@/lib/constant";
import React, { useContext, useEffect, useMemo, useState } from "react";

export interface ForumContext {
    rootComments: CommentItem[];
    getReplies: (parentId: string) => CommentItem[];
    createLocalComment: (comment: CommentItem) => void;
    courseId: string;
    userId: string | undefined;
}

const initialContextValue: ForumContext = {
    rootComments: [],
    getReplies: (parentId: string) => ([]),
    createLocalComment: (comment: CommentItem) => ([]),
    courseId: '',
    userId: undefined,
};

const Context = React.createContext(initialContextValue);


export function useForum() {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useForum must be used within a ForumProvider");
    }
    return context;
}

export function ForumProvider({items, children, courseId, userId} : {items: CommentItem[],children: React.ReactNode, courseId: string, userId: string | undefined}) {
    const [comments, setComments] = useState<CommentItem[]>([]);

    const commentsByParentId = useMemo<{ [key: string]: CommentItem[] }>(() => {      
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
    
    useEffect(() => {
        if (items == null) return;
        setComments(items);
    }, [items])

    function createLocalComment(comment: CommentItem) {
        setComments(prevComments => {
            return [comment, ...prevComments];
        })
    }

    function getReplies(parentId: string) {
        return commentsByParentId[parentId];
    }
    return <Context.Provider value={{
        getReplies,
        rootComments: commentsByParentId[''],
        createLocalComment,
        courseId,
        userId,
    }}>
        {children}
    </Context.Provider>
}