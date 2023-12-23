"use client";

import { BookOpenIcon } from "lucide-react";
import { CourseProgress } from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";

interface CourseDescriptionProps {
  title: string;
  description: string;
  numChapter: number;
  progressCount: number;
}

export const CourseDescription = ({
  title,
  description,
  numChapter,
  progressCount,
}: CourseDescriptionProps) => {


  return (
    <div className="border rounded-md p-6">
      <div className="flex items-center gap-x-2 mb-1">
        <IconBadge size='sm' icon={BookOpenIcon} /> Number of chapters: {numChapter}
      </div>
      <h3 className="font-semibold text-lg md:text-2xl mb-2 capitalize">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <CourseProgress variant="success" value={progressCount} />
    </div>
  );
}