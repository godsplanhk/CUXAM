"use client"
import React, { useEffect, useRef, useState } from "react"
import {
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  // RowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils/cn";


export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setSelectedRows: React.Dispatch<React.SetStateAction<[]>>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelectedRows
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection
    }
  });
  const confirmed= useRef<boolean>(true);
  const [filter,setFilter] = useState<string>(table.getAllColumns()[0].id);
  useEffect(function (){confirmed.current=false;},[rowSelection])
  return (
    <div className="z-0">
      <div className="flex items-center py-4 gap-1">
        <div>Total: {table.getFilteredRowModel().rows.length}</div>
        <div className='flex gap-1 justify-center grow'>
        <Input
          placeholder={"Filter "+filter}
          value={(table.getColumn(filter)?.getFilterValue() as string)}
          onChange={(event) =>
            {
              table.getColumn(filter)?.setFilterValue(event.target.value);
              table.getSelectedRowModel
            }
          }
          className="w-auto"
        />

         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-4">
              {filter?filter:"Select Filter"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-neutral-900">
            {table
              .getAllColumns()
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.id ===filter}
                  onCheckedChange={() =>
                    setFilter(column.id)
                  }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
                ) 
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="md:flex items-center justify-end space-x-2 py-4 gap-4">
      {table.getSelectedRowModel().rows.length} of {table.getCoreRowModel().rows.length} selected.
            <div className="flex gap-4">
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
        <Button
          variant="outline"
          size="sm"
          className={cn("transition duration-2000",{"bg-green-500":confirmed.current})}
          onClick={()=>{
            setSelectedRows((table.getSelectedRowModel().rows.map(e=>e.original))as []);
            confirmed.current= true;
          }}
          >
          Confirm
        </Button>
      </div>
          </div>
    </div>
  )
}
