"use client";

import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { CourseProgress } from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { Category } from "@prisma/client";
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CourseDescriptionProps {
  title: string;
  description: string;
  numChapter: number;
  progressCount: number;
  categories: Category[];
}

export const CourseDescription = ({
  title,
  description,
  numChapter,
  progressCount,
  categories,
}: CourseDescriptionProps) => {


  return (
    <div className="border rounded-md p-6">
      <div className="flex items-center gap-x-2 mb-1">
        <IconBadge size='sm' icon={BookOpenIcon} /> Number of chapters: {numChapter}
      </div>
      <h3 className="font-semibold text-lg md:text-2xl mb-2 capitalize">
        {title}
      </h3>
      <div className="pb-4">
          {categories.map(category => (
            <Link key={category.id} href={`/search?categoryId=${category.id}`} passHref>
              <Badge className={cn("bg-blue-50 text-black-500")}>{category.name}</Badge>
            </Link>
          ))}
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <CourseProgress variant="success" value={progressCount} />
    </div>
  );
}