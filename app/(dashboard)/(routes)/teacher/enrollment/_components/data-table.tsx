"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel, 
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from 'next/navigation'

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

interface DataTableProps<TData extends WaitlistItem> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

export function DataTable<TData extends WaitlistItem>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const router = useRouter();
  const [selectedEnrollIds, setSelectedEnrollIds] = React.useState<string[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  React.useEffect(() => {
    const selectedRows = table.getRowModel().flatRows.filter((row) => row.getIsSelected());
    const selectedIds = selectedRows.map((row) => row.original.id);
    setSelectedEnrollIds(selectedIds);
  }, [table.getRowModel().flatRows]);
  
  const handleBatchAcceptClick = async () => {
    try {
      const selectedRows = table.getRowModel().flatRows.filter((row) => row.getIsSelected());
      if (selectedRows.length === 0) {
        toast.error("Please select at least one row");
      } else {
        for (const row of selectedRows) {
          const enrollId = row.original.id;
          const response = await axios.post(`/api/enroll/${enrollId}`);
          console.log(`User ${enrollId} approved successfully:`, response.data);
        }
  
        toast.success("Enrolls Approved");
        selectedRows.forEach((row) => row.toggleSelected(false));
        setSelectedEnrollIds([]);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        {/* Filter user id */}
        <Input
          placeholder="Filter User ID..."
          value={(table.getColumn("userId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("userId")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* TODO: Handle button */}
        <div className="flex space-x-2">
          <Link href="">
            <Button className="bg-green-500" onClick={handleBatchAcceptClick}>
              Accept
            </Button>
          </Link>
          {/*Add user button (add route in link href) */}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
