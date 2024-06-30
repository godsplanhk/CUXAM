"use client"
import React, { FunctionComponent, useEffect, useRef, useState } from "react"
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
  VisibilityState,
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
import { useToast } from "./use-toast";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setSelectedRows: React.Dispatch<React.SetStateAction<[]>>,
  tableName?: string
  confirm?: FunctionComponent
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelectedRows,
  confirm,
  tableName
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
  const confirmed = useRef<boolean>(true);
  const [filter, setFilter] = useState<string>(table.getAllColumns()[0].id);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(function () { confirmed.current = false; }, [rowSelection])
  const { toast } = useToast();
  return (
    <div className="z-0">
      <div className="items-center py-4 gap-2 flex justify-center">
        <div>Total: {table.getFilteredRowModel().rows.length}</div>
        <div className='flex gap-1 justify-center'>
          <Input
            placeholder={"Filter " + filter}
            value={(table.getColumn(filter)?.getFilterValue() as string)}
            onChange={(event) => {
              table.getColumn(filter)?.setFilterValue(event.target.value);
              table.getSelectedRowModel
            }
            }
            className="max-w-52"
          />

          <DropdownMenu onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                <div className="flex justify-center items-center gap-1">
                  {filter ? filter : "Select Filter"}
                  {isFilterOpen ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
                </div>
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
                      checked={column.id === filter}
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
      <div className="flex items-center justify-center space-x-2 py-4 gap-4">
        {table.getSelectedRowModel().rows.length} of {table.getCoreRowModel().rows.length} selected
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight />
          </Button>
          {confirm ?
            confirm(onclick = () => {
              toast({ title: tableName + ' confirmation', description: table.getSelectedRowModel().rows.length.toString() + 'selected' });
              setSelectedRows((table.getSelectedRowModel().rows.map(e => e.original)) as []);
              confirmed.current = true;
            }) :
            <Button
              variant="outline"
              className={cn("transition duration-2000 text-base", { "bg-green-500": confirmed.current })}
              onClick={() => {
                toast({ title: tableName + ' confirmation', description: table.getSelectedRowModel().rows.length.toString() + ' elements selected' });
                setSelectedRows((table.getSelectedRowModel().rows.map(e => e.original)) as []);
                confirmed.current = true;
              }}
            >
              Confirm
            </Button>}
        </div>
      </div>
    </div>
  )
}

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function UserTable<TData, TValue>({
  columns,
  data,
}: UserTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnOpen, setColumnOpen] = useState(false)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-left mb-2">All Users</h1>
        <div className="mb-1 font-medium">({table.getFilteredRowModel().rows.length}) Users</div>
      </div>
      <div className="flex my-3 justify-between gap-2">
        <Input
          placeholder="Filter Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <div className="flex items-center gap-1 justify-center font-semibold">
                <Plus size={20} />
                <p>New User</p>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  className="col-span-3"
                  type="password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenu onOpenChange={setColumnOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <div className="flex align-center gap-2">
                <p>Columns</p>
                {columnOpen ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
    </>
  )
}