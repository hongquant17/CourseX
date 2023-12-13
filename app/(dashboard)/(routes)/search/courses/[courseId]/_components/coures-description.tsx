"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { BookOpenIcon } from "lucide-react";

interface CourseDescriptionProps {
  title: string;
  description: string;
  numChapter: number;
}

export const CourseDescription = ({
  title,
  description,
  numChapter,
}: CourseDescriptionProps) => {

  return (
    <div className="border rounded-md p-6">
        <div className="flex items-center gap-x-2 mb-1">
            <BookOpenIcon/> Số chương: {numChapter}
        </div>
        <h3 className="font-semibold text-lg md:text-2xl mb-2 capitalize">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
    </div>
  )
}