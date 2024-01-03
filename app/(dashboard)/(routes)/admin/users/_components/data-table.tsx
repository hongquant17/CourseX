"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TYPE_CHANGE, UserItem } from "@/lib/constant";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  ids: Array<string>;
  type: number;
}
interface DataTableProps<TData extends UserItem, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends UserItem, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  React.useEffect(() => {
    const selectedRows = table
      .getRowModel()
      .flatRows.filter((row) => row.getIsSelected());
    const selectedIds = selectedRows.map((row) => row.original.id);
    setSelectedIds(selectedIds);
  }, [rowSelection]);

  const handleBatchClick = async (typeAction: number) => {
    const formData: FormData = {
      ids: selectedIds,
      type: typeAction,
    };
    try {
      if (typeAction == TYPE_CHANGE["ADMIN"] && formData.ids.length > 1)
        toast.error("Choose only one user to grant admin privilege");
      else {
        const res = await axios.post(`/api/users/change/role`, formData);
        if (res.status == 200) {
          toast.success(res.data.message);
          table.toggleAllPageRowsSelected(false);
          setSelectedIds([]);
          router.refresh();
        }
      }
    } catch {
      toast.error("Select an user");
    }
  };

  return (
    <div className="px-10 pt-4 pb-10">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search for users..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex space-x-2">
          <Button
            className="bg-red-500"
            onClick={() => handleBatchClick(TYPE_CHANGE["ADMIN"])}
          >
            Toggle Admin
          </Button>
          <Button
            className="bg-green-500"
            onClick={() => handleBatchClick(TYPE_CHANGE["OTHER_ROLE"])}
          >
            Toggle Teacher
          </Button>
          <Button
            className="bg-gray-500"
            onClick={() => handleBatchClick(TYPE_CHANGE["DELETE"])}
          >
            Delete Users
          </Button>
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
      <div className="mt-10 flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {/* {table.getFilteredSelectedRowModel().rows.map()} */}
        {table.getFilteredRowModel().rows.length} user(s) selected.
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="default"
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
