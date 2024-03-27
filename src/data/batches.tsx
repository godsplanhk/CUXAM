"use client"
import { Button } from "@/components/ui/button";
import { ColumnDef,  } from "@tanstack/react-table";
import { ArrowUpDown, } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const Batchcolumns: ColumnDef<Batch>[] = [
    
  {
    accessorKey: "id",
    header: ({ table }) => (
      <div className="flex gap-4 w-full justify-start">
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      >Id</Checkbox>BatchId</div>
    ),
    cell: ({ row }) => (
      <div className="flex gap-4 justify-start">
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        >{row.id}</Checkbox>
        {row.getValue('id')}
        </div>
    ),
    },
  {
    accessorKey: "branch",
    header: ({ column }) => {
        return (
          <div className="w-full flex justify-center">

          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Branch
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
            </div>
        )
      },
  },{
    accessorFn: (originalRow) => originalRow.semester.toString(),
    accessorKey: "semester",
    header: ({ column }) => {
        return (
          <div className="w-full flex justify-center">

          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Semester
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button></div>
        )
      },
  }
]
