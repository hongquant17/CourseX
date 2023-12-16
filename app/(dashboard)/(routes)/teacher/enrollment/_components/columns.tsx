"use client"

import { Enroll } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"


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

export const columns: ColumnDef<Enroll>[] = [
  {
    id: "actions", 
    cell: ({ row }) => {
      return (
        // TODO
        <Checkbox />
      );
    }
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        /* TODO: Handle status */
        <Badge className={cn("bg-pink-100 text-red-500")}>
          Pending
        </Badge>
      );
    },
  }, 
]
