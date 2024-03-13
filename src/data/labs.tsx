import { rooms } from "@/types/rooms";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown,  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
export const labsList: { data: rooms[] } = {
  data: [
    { id: "1", labNo: "207", capacity: 36, block: "14-D2" },
    { id: "3", labNo: "306", capacity: 35, block: "14-D2" },
    { id: "4", labNo: "307", capacity: 35, block: "14-D2" },
    { id: "5", labNo: "308", capacity: 33, block: "14-D2" },
    { id: "6", labNo: "317", capacity: 33, block: "14-D2" },
    { id: "7", labNo: "318", capacity: 28, block: "14-D2" },
    { id: "8", labNo: "408", capacity: 46, block: "14-D2" },
    { id: "9", labNo: "409", capacity: 43, block: "14-D2" },
    { id: "10", labNo: "410", capacity: 30, block: "14-D2" },
    { id: "11", labNo: "411", capacity: 34, block: "14-D2" },
    { id: "12", labNo: "412", capacity: 30, block: "14-D2" },
    { id: "13", labNo: "413", capacity: 30, block: "14-D2" },
    { id: "14", labNo: "414", capacity: 36, block: "14-D2" },
    { id: "16", labNo: "415", capacity: 35, block: "14-D2" },
    { id: "17", labNo: "416", capacity: 30, block: "14-D2" },
    { id: "18", labNo: "508", capacity: 27, block: "14-D2" },
    { id: "20", labNo: "512", capacity: 36, block: "14-D2" },
    { id: "21", labNo: "513", capacity: 33, block: "14-D2" },
    { id: "22", labNo: "514", capacity: 30, block: "14-D2" },
    { id: "23", labNo: "101", capacity: 45, block: "12-D3" },
    { id: "24", labNo: "209-A", capacity: 41, block: "12-D3" },
    { id: "25", labNo: "209", capacity: 40, block: "12-D3" },
    { id: "26", labNo: "210", capacity: 39, block: "12-D3" },
    { id: "27", labNo: "211", capacity: 41, block: "12-D3" },
    { id: "28", labNo: "101", capacity: 35, block: "11-D4" },
    { id: "29", labNo: "102", capacity: 36, block: "11-D4" },
    { id: "30", labNo: "103", capacity: 36, block: "11-D4" },
    { id: "31", labNo: "104", capacity: 40, block: "11-D4" },
    { id: "32", labNo: "106", capacity: 40, block: "11-D4" },
  ],
};

export const LabsColumn: ColumnDef<rooms>[] = [
    {   
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        >Id</Checkbox>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        >{row.id}</Checkbox>
      ),
        accessorKey: "id"
    },
    {
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Lab No.
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: "labNo"
    },
    {
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Capacity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: "capacity",
        accessorFn: (originalRow) => originalRow.capacity.toString()
    },
    {
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Block
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        accessorKey: "block"
    }
]

