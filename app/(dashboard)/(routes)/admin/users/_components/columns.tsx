"use client"

import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox"

import { cn, getRole } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import UserActions from "./actions";


export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
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
      const userId = String(row.getValue("id") || "");
      return (
        <div className="pl-2">
          {userId}
        </div>
      );
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="pl-20">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const name = String(row.getValue("name") || "");
      return (
        <div className="pl-2">
          {name}
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
    accessorKey: "role",
    accessorFn: row => getRole(row.role),
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
      const currentRole = String(row.getValue("role") || "");


      return (
        <div className="pl-8">
          {/* <Badge className={cn("bg-slate-500", true && "bg-sky-700" ,true && "bg-red-700")}>
            {true ? "Admin" : true ? "Teacher" : "Student"}
          </Badge> */}
          <Badge>
            {currentRole}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => {
      return (
        <div>
          Options
        </div>
      );
    },
    cell: ({ row }) => (
       <UserActions
       id = {row.original.id}
       role = {row.original.role}
       />
    )
  },
];