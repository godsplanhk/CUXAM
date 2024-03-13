"use client"
import { Button } from "@/components/ui/button";
import { ColumnDef,  } from "@tanstack/react-table";
import { ArrowUpDown, } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
export const BatchesList:{data:Batch[]} ={
    "data":[
        {
            "batchId":"22AML",
            "branch": "AML",
            "semester": 4,
            "subjects": [  {
                "Subject": "Data Structure",
                "SubjectCode": "22CSH-241"
            },
            {
                "Subject": "Database Management System",
                "SubjectCode": "22CSH-243"
            },
            {
                "Subject": "Operating System",
                "SubjectCode": "22CSH-242"
            },
            {
                "Subject": "Programming in Java",
                "SubjectCode": "22CSH-244"
            }]

        },
        {
            "batchId":"21AML",
            "branch":"AML",
            "semester":6,
            "subjects":[{
                "Subject": "COMPUTER NETWORKS",
                "SubjectCode": "21CSH-335"
            },
            {
                "Subject": "DOCKERS AND KUBERNETES LAB",
                "SubjectCode": "21CSP-343"
            },
            {
                "Subject": "ADVANCED MACHINE LEARNING",
                "SubjectCode": "21CSH-346"
            },
            {
                "Subject": "SOFT COMPUTING",
                "SubjectCode": "21CSH-345"
            },
            {
                "Subject": "DATA MINING AND WAREHOUSING",
                "SubjectCode": "21CSH-334"
            }]
        },
        {
            "batchId":"20AML",
            "branch":"AML",
            "semester":8,
            "subjects":[{
                "Subject": "ADVANCED DATABASE MANAGEMENT LAB",
                "SubjectCode": "20CSP-436"
            },
            {
                "Subject": "ADVANCED DATABASE MANAGEMENT LAB",
                "SubjectCode": "20CSP-436"
            },
            {
                "Subject": "DEEP LEARNING LAB",
                "SubjectCode": "20CSF-431"
            }]
        }
    ]
};


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const Batchcolumns: ColumnDef<Batch>[] = [
    
  {
    accessorKey: "batchId",
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
    },
  {
    accessorKey: "branch",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Branch
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },{
    accessorFn: (originalRow) => originalRow.semester.toString(),
    accessorKey: "semester",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Semester
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  }
]
