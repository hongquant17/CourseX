"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

import { cn, getRole } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
      return <div className="pl-2">{userId}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="pl-4">
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
      return <div className="pl-2">{name}</div>;
    },
  },
  {
    accessorKey: "role",
    accessorFn: (row) => getRole(row.role),
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
      var firstRole = "";
      var secondRole = "";
      if (currentRole.includes("ADMIN")) {
        firstRole = "ADMIN";
        if(currentRole.includes("TEACHER")) secondRole = "TEACHER";
      } else {
        if (currentRole.includes("TEACHER")) secondRole = "TEACHER";
        if (currentRole.includes("USER")) secondRole = "USER";
      }

      return (
        <div className={`${!firstRole ? "pl-10" : ""}`}>
          {(firstRole) && <Badge className="bg-red-500">{firstRole}</Badge>}
          {(secondRole) && <Badge className={`${(secondRole == "TEACHER") ? "bg-green-500" : ""} ${firstRole ? "ml-2" : ""}`}>{secondRole}</Badge>}
        </div>
      );
    },
  },
];
