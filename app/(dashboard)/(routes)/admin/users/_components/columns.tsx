"use client"

import { Users } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { isTeacher } from "@/lib/teacher";
import { useRouter } from "next/router";
import { isAdmin } from "@/lib/admin";

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
      const userId = String(row.getValue("userId") || "");
      const isUserAdmin = isAdmin(userId);
      const isUserTeacher = isTeacher(userId);

      return (
        <div className="pl-8">
          <Badge className={cn("bg-slate-500", isUserTeacher && "bg-sky-700" ,isUserAdmin && "bg-red-700")}>
            {isUserAdmin ? "Admin" : isUserTeacher ? "Teacher" : "Student"}
          </Badge>
        </div>
      );  
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userId = String(row.getValue("userId") || "");
      const isUserTeacher = isTeacher(userId);

      const handleRoleChange = async () => {
        try {
          if (!isUserTeacher && prisma) {
            await prisma.users.update({
              where: { userId },
              data: {
                isTeacher: true
              },
            })
          }
          const router = useRouter();
          router.reload();
        } catch (error) {
          console.error("Error updating role:", error);
        }
      }
      return (
            /* TODO */
            <Button className="rounded-xl" variant="default" type="submit" onClick={handleRoleChange}>
              Change role
            </Button>
      );
    },
  },
];
