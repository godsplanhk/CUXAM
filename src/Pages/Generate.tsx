import { DataTable } from "@/components/ui/data-table";
import { Batchcolumns, BatchesList } from "@/data/batchesData";

export function Generate(){
    return (
        <div className="flex" >
        <div className="grid md:grid-cols-2 gap-4 w-auto" >
            <div className="m-2 rounded-sm shadow-sm border p-2 h-min">
                <p className="text-left my-2">Choose Batch</p>
                <DataTable columns={Batchcolumns} data={BatchesList['data']}></DataTable></div>
        </div></div>
    )
}