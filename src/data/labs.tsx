import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown,  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Lab } from "@/state/atoms/labs";

export const LabsColumn: ColumnDef<Lab>[] = [
    {   
      header: ({ table }) => (
        <div className="flex gap-4 justify-start">
        <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
          ></Checkbox>
          LabNo
          </div>
      ),
      cell: ({ row }) => (
        <div className="flex gap-4 w-full justify-start">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          >{row.id}</Checkbox>{row.getValue('labNo')}
          </div>
      ),
        accessorKey: "labNo"
    },
    {
        header: ({ column }) => {
            return (
              <div className="w-full flex justify-center">
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Capacity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button></div>
            )
          },
        accessorKey: "capacity",
        accessorFn: (originalRow) => originalRow.capacity.toString()
    },
    {
        header: ({ column }) => {
            return (
              <div className="w-full flex justify-center">
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Block
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button></div>
            )
          },
        accessorKey: "block"
    }
]

