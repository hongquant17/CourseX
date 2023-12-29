"use client"

import { useEffect, useState } from 'react';
import { Enroll } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { db } from "@/lib/db"
import axios from "axios";
import toast from "react-hot-toast";

export const useForceUpdate = () => {
  const [, setValue] = useState(0);
  return () => setValue(value => ++value);
};

type WaitlistItem = {
  id: string; 
  userId: string;
  courseId: string;
  createdAt: Date; 
  updatedAt: Date; 
  isAccepted: boolean;
  userName: string; 
  courseTitle: string; 
};

export const columns: ColumnDef<WaitlistItem>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={() => row.toggleSelected()}
        />
      );
    },
  },
  {
    accessorKey: 'userName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'userId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'courseTitle',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'courseId',
    header: ({ column }) => {
      return (

        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { id, isAccepted } = row.original;

      const [isApproved, setApproved] = useState(isAccepted);
      const [isAcceptVisible, setIsAcceptVisible] = useState(false);

      const forceUpdate = useForceUpdate();
      const router = useRouter();
      const handleAcceptClick = async () => {
        try {
          const response = await axios.post(`/api/enroll/${id}`);
          console.log("User approved successfully:", response.data);
          toast.success("Enroll Approved");
          setApproved(true);
          setIsAcceptVisible(false);
          router.refresh();

        } catch {
          toast.error("Something went wrong");
        }
      };
      
      useEffect(() => {
        forceUpdate();
      }, [isApproved]);

      return (
        <div>
          {!isAccepted ? (
          <Badge
            className={cn('bg-pink-100 text-red-500 cursor-pointer', {
              'cursor-pointer': !isAcceptVisible,
            })}
            onClick={() => setIsAcceptVisible(true)}
          >
            Pending
          </Badge>
          ) : (
          <Badge className={cn("bg-green-100 text-green-500")}>
            Accepted
          </Badge>
          )}
          {isAcceptVisible && (
            <div className="mt-2">
              <Button className='bg-green-500 text-white' onClick={handleAcceptClick}>Accept</Button>
            </div>
          )}
        </div>
      );
    },
  },
]
