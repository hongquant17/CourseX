import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { IconBadge } from "@/components/icon-badge";
import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  progress: number | null;
  categories: Category[];
};

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  progress,
  categories
}: CourseCardProps) => {
  return (
    <Link href={`/search/overview/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <div className="text-xs text-muted-foreground">
            {categories.map(category => (
              
              <Link key={category.id} href={`/search?category=${category.id}`}>
                <Badge className={cn("bg-white text-black-500")}>{category.name}</Badge>
              </Link>
            ))}
          </div>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}