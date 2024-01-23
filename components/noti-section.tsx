import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NotiSection = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
            <Bell />
        </PopoverTrigger>
        <PopoverContent className="">
            
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotiSection;
