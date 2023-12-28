"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ViewCourseProps {
    courseId: string;
    isAccepted: boolean;
}

export const ViewCourse = ({
    courseId,
    isAccepted,
}: ViewCourseProps) => {


    return (
      <div className="border rounded-md p-6 text-secondary bg-sky-900">
        <div className="mb-7">
          <h4 className="font-semibold text-lg mb-4">
            {isAccepted
              ? "Continue your learning"
              : "Not sure if this course suits you?"}
          </h4>
          <p className="text-sm text-neutral-200">
            {isAccepted
              ? "Watch from your last completed chapters."
              : "Preview some contents from this course now."}
          </p>
        </div>
        <Link href={`/courses/${courseId}`}>
          <Button className="text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md w-full">
            {isAccepted ? "Continue watching" : "Take me there"}
          </Button>
        </Link>
      </div>
    );
}