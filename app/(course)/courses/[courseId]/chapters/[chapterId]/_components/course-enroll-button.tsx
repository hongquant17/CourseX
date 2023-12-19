"use client";

import axios from "axios";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
}

export const CourseEnrollButton = ({
  courseId,
}: CourseEnrollButtonProps) => {
  const [isEnrolled, setIsEnrolled] = useState(false);

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
    <Button
      size="sm"
      className={`w-full md:w-auto ${isEnrolled ? 'bg-gray-500' : 'bg-sky-700'}`}
      onClick={onClick}
      disabled={isEnrolled}
    >
      {isEnrolled ? 'Đang chờ phê duyệt' : 'Tham gia'}
    </Button>
  );
};
