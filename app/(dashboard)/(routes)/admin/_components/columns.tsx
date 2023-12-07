"use client"

import { Users } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { isTeacher } from "@/lib/teacher";

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <div className="pl-20">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const userId = String(row.getValue("userId") || "");
      return (
        <div className="pl-2">
          {userId}
        </div>
      );
    }
  },
  // {
  //   accessorKey: "price",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Username
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const price = parseFloat(row.getValue("price") || "0");
  //     const formatted = new Intl.NumberFormat("vi-VN", {
  //       style: "currency",
  //       currency: "VND",
  //     }).format(price);

  //     return <div>{formatted}</div>;
  //   },
  // },
  {
    accessorKey: "isAdmin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Highest Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdmin") || false;
      const isTeacher = row.getValue("isTeacher") || false;

      return (
        <div className="pl-8">
          <Badge className={cn("bg-slate-500", isAdmin && "bg-sky-700")}>
            {isAdmin ? "Admin" : isTeacher ? "Teacher" : "Student"}
          </Badge>
        </div>
      );  
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
            /* TODO */
            <Button className="bg-gray-700 rounded-md" variant="default" type="submit" onClick={()=>{}}>
              Change role
            </Button>
      );
    },
  },
];
