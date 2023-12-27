"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForum } from "./_contexts/forum-context";
import toast from "react-hot-toast";
interface FormData {
    comment: string,
    userId: string | undefined,
    parentId:string | null,
}
interface ParentIdProps {
    parentId: string | null,
}
const CommentForm = ({parentId}: ParentIdProps) => {
    const router = useRouter();
    const forumContext = useForum();
    const [formData, setFormData] = useState<FormData>({
        comment: '',
        userId: forumContext.userId,
        parentId: parentId,
    });
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        const res = await fetch(`/api/courses/${forumContext.courseId}/comment`, {
            method: "POST",
            body: JSON.stringify({ formData }),
            headers,
        });
        if (!res.ok) {
            const response = await res.json();
            setErrorMessage(response.message);
        } else {
            toast.success("Commented");
            router.refresh();
        }
    };

    return (
    <>
        <form onSubmit={handleSubmit} method="POST" className="w-2/3">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Comment</label>
                <div className="flex">
                    <Input type="text" id="comment" name="comment" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 mr-2" 
                        required placeholder="" onChange={handleChange} value={formData.comment} autoFocus/>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit</button>
                </div>
            </div>
        </form>
    </>);
};
export default CommentForm;