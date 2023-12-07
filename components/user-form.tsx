"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setErrorMessage("");
        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ formData }),
            headers,
        });
        if (!res.ok) {
            const response = await res.json();
            setErrorMessage(response.message);
        } else {
            router.refresh();
            router.push("/");

        }
    };

    return (
    <>
        <form onSubmit={handleSubmit} 
        method="POST" 
        className="flex flex-col gap-3 w-1/2"> 
        </form>
    </>);
};
