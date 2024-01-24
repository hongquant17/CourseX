import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const NotiSection = () => {
  return (
    <>
      <Link href={`/notification`}>
        <Bell className="cursor-pointer"></Bell>
      </Link>
    </>
  );
};

export default NotiSection;
