"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ForumProps {
    courseId: string;
    isAccepted: boolean;
}

export const Forum = ({
    courseId,
    isAccepted,
}: ForumProps) => {


    return (
        <div className="border rounded-md p-6 text-secondary bg-sky-900">
            <div className="mb-7">
                <h4 className="font-semibold text-lg mb-4">
                    Discussion forum of this course
                </h4>
                <p className="text-sm text-neutral-200">
                    Enter the forum to discuss
                </p>
            </div>
            <Link href={`/courses/${courseId}/forum`}>
                <Button
                    className="text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md w-full"

                >
                    Forum
                </Button>
            </Link>

        </div>
    )
}