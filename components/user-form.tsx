"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({});
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
            <h1>Register</h1>
            <label>Full Name</label>
            <input id="name" name="name" type="text" onChange={handleChange} required={true} value={formData.name} className="m-2 bg-slate-400 rounded"/>
            <label>Username</label>
            <input id="username" name="username" type="text" onChange={handleChange} required={true} value={formData.username} className="m-2 bg-slate-400 rounded"/>
            <label>Password</label>
            <input id="password" name="password" type="password" onChange={handleChange} required={true} value={formData.password} className="m-2 bg-slate-400 rounded"/>
            <label>Email</label>
            <input id="email" name="email" type="text" onChange={handleChange} required={true} value={formData.email} className="m-2 bg-slate-400 rounded"/>
            <label>Phone</label>
            <input id="phone" name="phone" type="tel" onChange={handleChange} required={true} value={formData.phone} className="m-2 bg-slate-400 rounded"/>
            <input type="submit" value="Register" className="bg-blue-300 hover:bg-blue-100"/>
        </form>
        <p className="text-red-500">{errorMessage}</p>
    </>);
};
