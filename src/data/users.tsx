"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Users } from "@/state/atoms/users"
import { ArrowUpDown, MoreHorizontal, Clipboard, Lock, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export const userColumns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <div className="text-center">
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}><p className="text-base font-bold">Name</p>
        <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
      </Button>
    </div>,
  },
  {
    accessorKey: "ecode",
    header: () => <div className="text-center text-base font-bold">ECode</div>,
  },
  {
    accessorKey: "role",
    header: () => <div className="text-center text-base font-bold">Role</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      const [isEditOpen, setIsEditOpen] = useState(false);

      return (
        <>
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={user.name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Ecode
                  </Label>
                  <Input
                    id="ecode"
                    defaultValue={user.ecode}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={user.role} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog >

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.ecode)}
              >
                <div className="flex gap-2 items-center"><Clipboard size={18} /><p>Copy ECode</p></div>

              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex gap-2 items-center">
                  <Lock size={18}></Lock>
                  <p>Change Password</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                <div className="flex gap-2 items-center">
                  <Pencil size={18}></Pencil>
                  <p>Edit User</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex gap-2 text-red-600 items-center">
                  <Trash2 size={18}></Trash2>
                  <p>Delete User</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]
