import { UserTable } from "@/components/ui/data-table";
import { userColumns } from "@/data/users";
import { User } from "@/state/atoms/users"; // Remove this import

export function UserManagement() {
    return (
        <section className="py-16">
            <div className="container">
                <UserTable
                    columns={userColumns}
                    data={User}
                ></UserTable>
            </div>
        </section>
    )
}