import { DataTable } from "@/components/ui/data-table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Batchcolumns } from "@/data/batches";
import { datesState } from "@/state/atoms/dateRange";
import { useRecoilValue,useRecoilState, useSetRecoilState } from "recoil";
import { LabsColumn } from "@/data/labs";
import { labsState, selectedLabsState } from "@/state/atoms/labs";
import { batchState, selectedBatchState } from '../state/atoms/batch';
import { selectedTeacherState, teachersSelector } from "@/state/atoms/teachers";
import { teacherColumns } from "@/data/teachers";
export function Generate(){

    return (
            <div className="grid md:grid-cols-10 gap-1" >
                <div className="md:col-span-3" >
                <div className=" m-2 rounded-sm shadow-md border p-2 hover:shadow-md hover:shadow-green-500 h-min">
                    <p className="text-left my-2">Choose Batch</p>
                    <BatchSelection/>
                </div>
                </div>
            <div className=" justify-center w-auto md:col-span-3 my-2 rounded-sm shadow-md border p-2 h-min hover:shadow-md hover:shadow-green-500">
                <div>
                    <p className="text-text-left my-2">Choose MST Dates</p>
                    {DatePickerSelection()}
                </div>
                    <p className="text-left my-2">Choose Rooms</p>
                {RoomSelection()}
                    </div>
            <div className="md:col-span-4 m-2 rounded-sm shadow-md border p-2 h-min hover:shadow-md hover:shadow-green-500 overflow-auto" >
                <p className="text-left my-2">Choose Teachers</p>
                {TeacherSelection()}
            </div>
            <div>
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

function TeacherSelection(){
    const teacher = useRecoilValue(teachersSelector);
    const sTeacher = useSetRecoilState(selectedTeacherState);
    return (
        <DataTable columns={teacherColumns} data={teacher} setSelectedRows={sTeacher}></DataTable>
        )
}

function BatchSelection(){
    const batches = useRecoilValue(batchState);
    const sBatches = useSetRecoilState(selectedBatchState)
    return (
        <DataTable columns={Batchcolumns} data={batches} setSelectedRows={sBatches}></DataTable>
        )
}

function RoomSelection(){
    const labs = useRecoilValue(labsState);
    const sLabs = useSetRecoilState(selectedLabsState);
    return (
        <DataTable columns={LabsColumn} data={labs} setSelectedRows={sLabs}></DataTable>
    )
}
