"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
interface FormData {
    comment: string,
}
const CommentForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        comment: '',
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
        const res = await fetch("/api/comment/post", {
            method: "POST",
            body: JSON.stringify({ formData }),
            headers,
        });
        if (!res.ok) {
            const response = await res.json();
            setErrorMessage(response.message);
        } else {
            router.refresh();
        }
    };

    return (
    <>
        <form onSubmit={handleSubmit} method="POST" className="w-2/3">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Comment</label>
                <Input type="text" id="comment" name="comment" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" 
                       required placeholder="Nguyen Van A" onChange={handleChange} value={formData.comment} autoFocus/>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit</button>
        </form>
    </>);
};
export default CommentForm;