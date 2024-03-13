import { DataTable } from "@/components/ui/data-table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Batchcolumns, BatchesList } from "@/data/batchesData";
import { datesState } from "@/state/atoms/dateRange";
import { useRecoilState } from "recoil";
import { DateRange } from "react-day-picker"
import { LabsColumn } from "@/data/labs";
import { labsState } from "@/state/atoms/labs";
export function Generate(){
    return (
            <div className="grid md:grid-cols-10 gap-1" >
                <div className="md:col-span-3" >
                <div className=" m-2 rounded-sm shadow-md border p-2 h-min hover:shadow-md hover:shadow-green-500">
                    <p className="text-left my-2">Choose Batch</p>
                    <DataTable columns={Batchcolumns} data={BatchesList['data']}></DataTable>
                </div>
                {'hiiii'}
                </div>
            <div className=" justify-center w-auto md:col-span-3 my-2 rounded-sm shadow-md border p-2 h-min hover:shadow-md hover:shadow-green-500">
                    <p className="text-text-left my-2">Choose MST Dates</p>
                    {DatePickerSelection()}
                    </div>
            <div className="md:col-span-4 m-2 rounded-sm shadow-md border p-2 h-min hover:shadow-md hover:shadow-green-500 overflow-auto" >
                <p className="text-left my-2">Choose Rooms</p>
                {RoomSelection()}
            </div>
            <div>
                {"hiiii"}
            </div>
        </div>
    )
}

function DatePickerSelection(){
    const [dates, setDates] = useRecoilState(datesState);
    return (
        <div className="w-auto" >
            <DatePickerWithRange days={dates} setDays={setDates}></DatePickerWithRange>
        </div>
    )
}

function RoomSelection(){
    const [labs, setLabs] = useRecoilState(labsState);
    return (
        <DataTable columns={LabsColumn} data={labs}></DataTable>
    )
}
