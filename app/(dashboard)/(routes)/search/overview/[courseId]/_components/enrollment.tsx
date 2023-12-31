"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface EnrollmentProps {
    courseId: string;
    isEnrolled: boolean;
}

export const Enrollment = ({
    courseId,
    isEnrolled,
}: EnrollmentProps) => {

    const [isRequestEnrolled, setIsEnrolled] = useState(isEnrolled);

    const onClick = async () => {
        try {
            const response = await axios.post(`/api/courses/${courseId}/enroll`);
            console.log("User enrolled successfully:", response.data);
            setIsEnrolled(true);
            toast.success("Course enrolled");
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="border rounded-md p-6 text-secondary bg-sky-900">
            <div className="mb-7">
                <h4 className="font-semibold text-lg mb-4">Join learning now</h4>
                <p className="text-sm text-neutral-200"> 
                {isRequestEnrolled ? "Enroll request has been sent. Wait for being approved." : "Press the button below to send an enroll request."}
                
                </p>
            </div>

            <Button
                className="text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md w-full"
                onClick={onClick}
                disabled={isRequestEnrolled}
            >
                {isRequestEnrolled ? "Waiting for approval" : "Enroll"}
            </Button>
        </div>
    )
}