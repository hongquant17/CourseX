import { Bell, BellDot } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useSocket } from "./providers/socket-provider";

const NotiSection = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <>
        <Link href={`/notification`}>
          <Bell className="cursor-pointer"></Bell>
        </Link>
      </>
    );
  }
  else {
    return (
      <>
        <Link href={`/notification`}>
          <BellDot className="cursor-pointer"></BellDot>
        </Link>
      </>
    );
  }
};

export default NotiSection;
