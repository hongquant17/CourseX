"use client";

import { Button } from "@/components/ui/button";

interface EnrollmentProps {
    courseId: string;
}

export const Enrollment = ({
    courseId
}: EnrollmentProps) => {

    return (
        <div className="border rounded-md p-6 text-secondary bg-sky-900">
            <div className="mb-7">
                <h4 className="font-semibold text-xl mb-4"> Tham gia khóa học</h4>
            </div>
            <Button
                className="text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full"
            >
                Tham gia
            </Button>

        </div>
    )
}