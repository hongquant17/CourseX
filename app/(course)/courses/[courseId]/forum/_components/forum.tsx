'use client'
import { useForum } from "./_contexts/forum-context";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";

export default function Forum() {
    const  forumContext = useForum();
    var rootComments = forumContext.rootComments;
    return (
    <div className="flex flex-col items-center h-screen">
        <CommentForm  parentId={null}/>
        {rootComments != null && rootComments.length > 0 && (
            <div>
                <CommentList items={rootComments}></CommentList>
            </div>
        )}
    </div>
    )
}