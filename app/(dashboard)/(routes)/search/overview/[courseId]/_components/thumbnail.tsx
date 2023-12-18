"use client";

import Image from "next/image";

interface ThumbnailProps {
  imgUrl: string;
}

export const Thumbnail = ({
  imgUrl
}: ThumbnailProps) => {

  return (
    <div className="relative aspect-video border rounded-md overflow-hidden bg-slate-100">
        <Image
        fill
        alt="alt"
        src={imgUrl}
        />
    </div>
  )
}