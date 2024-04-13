import { DataTable } from "@/components/ui/data-table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Batchcolumns } from "@/data/batches";
import { datesState } from "@/state/atoms/dateRange";
import { useRecoilValue, useRecoilState, useRecoilRefresher_UNSTABLE } from "recoil";
import { LabsColumn } from "@/data/labs";
import { labsState, selectedLabsState } from "@/state/atoms/labs";
import { batchState, selectedBatchState } from '../state/atoms/batch';
import { selectedTeacherState, teachersSelector } from "@/state/atoms/teachers";
import { teacherColumns } from "@/data/teachers";
import { Suspense } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import { fallbackRender } from "@/components/errorBoundary";
import { LoaderIcon } from "lucide-react";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import api from '../utils/axiosInstance';
import { branchState, selectedBranchState } from "@/state/atoms/branch";
import { branchColumns } from "@/data/branches";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { GenerateBar } from "@/components/ui/navbar";

function Loader(){
    return <LoaderIcon></LoaderIcon>

}
export function Generate() {
    const batchRefresh = useRecoilRefresher_UNSTABLE(batchState);
    const labRefresh = useRecoilRefresher_UNSTABLE(labsState);
    const teacherRefresh = useRecoilRefresher_UNSTABLE(teachersSelector);
    const authHeader = useAuthHeader();
    api.defaults.headers['Authorization']=authHeader?.split(' ')[1]??null;
  return (
    <div className="grid md:grid-cols-10 gap-1">
      <div className="md:col-span-5 lg:col-span-3">
        <div className=" m-2 rounded-sm shadow-md border p-2 hover:shadow-md hover:shadow-green-500 h-min justify-center">
            <ErrorBoundary fallbackRender={fallbackRender} onError  ={()=>batchRefresh()}>
          <Suspense fallback={<Loader/>}>
            <BranchSelection />
          </Suspense>
            </ErrorBoundary>
        </div>
      </div>
      <div className=" justify-center w-auto md:col-span-5 lg:col-span-3 my-2 rounded-sm shadow-md border p-2 h-min hover:shadow-md hover:shadow-green-500">
        <div>
          <DatePickerSelection />
        </div>
        <ErrorBoundary fallbackRender={fallbackRender} onError={()=>labRefresh()}>
        <Suspense fallback={<Loader/>}>
          <RoomSelection />
        </Suspense>
        </ErrorBoundary>
      </div>
      <ErrorBoundary fallbackRender={fallbackRender} onError={()=>teacherRefresh()}>
      <Suspense fallback={<Loader/>}>
      <div className="md:col-span-10 lg:col-span-4 m-2 rounded-sm shadow-md border p-2 h-min hover:shadow-md hover:shadow-green-500 overflow-auto items-center justify-center">
          <TeacherSelection />
          <GenerateBar/>
      </div>
        </Suspense>
        </ErrorBoundary>
      <Toaster/>
    </div>
  );
}
function Selection(message: string, count: number) {
  return (
    <div>
      {count} {message} Selected.
    </div>
  );
}
function DatePickerSelection() {
  const [dates, setDates] = useRecoilState(datesState);
  return (
    <div className="w-auto">
      <div>
        <p className="text-left my-2">Choose MST Dates</p>
        {Selection("Dates", dates?.length ?? 0)}
      </div>
      <DatePickerWithRange
        days={dates}
        setDays={setDates}
      ></DatePickerWithRange>
    </div>
  );
}

function TeacherSelection() {
  const [selectedTeacher, sTeacher] = useRecoilState(selectedTeacherState);
  const teacher = useRecoilValue(teachersSelector);

  return (
    <div>
      <div>
        <p className="text-left my-2">Choose Teachers</p>
        {Selection("Teacher", selectedTeacher.length)}
      </div>
      <DataTable
        tableName="Teacher Selection "
        columns={teacherColumns}
        data={teacher}
        setSelectedRows={sTeacher}
      ></DataTable>
    </div>
  );
}

function BranchSelection() {
  const branches = useRecoilValue(branchState);
  const [selectedBranches, sBranches] = useRecoilState(selectedBranchState);

  return (
    <div>
      <div>
        <p className="text-left my-2">Choose Branch</p>
        {Selection("Branches", selectedBranches.length)}
      </div>
      <DataTable
        tableName="Branches Selection"
        columns={branchColumns}
        data={branches}
        setSelectedRows={sBranches}
      ></DataTable>
    </div>
  );
}

//FIXME FEATURE DIALOG

export function BatchSelection() {
  const batches = useRecoilValue(selectedBatchState);
  const selectedBatches = useRecoilValue(selectedBatchState);

  return (
      <Dialog>
  <DialogTrigger><Button variant={'outline'}>Confirm</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        All the sections of selected batches will be selected.
      </DialogDescription>
      <p className="text-left my-2">Choose Batch</p>
        {Selection("Batches", selectedBatches.length)}
      <DataTable
        columns={Batchcolumns}
        data={batches}
        setSelectedRows={()=>{}}
      ></DataTable>
    </DialogHeader>
  </DialogContent>
</Dialog>
  );
}

function RoomSelection() {
  const labs = useRecoilValue(labsState);
  const [selectedLabs, setLabs] = useRecoilState(selectedLabsState);

  return (
    <div>
      <div>
        <p className="text-left my-2">Choose Labs</p>
        {Selection("Rooms", selectedLabs.length)}
      </div>
      <DataTable
        tableName="Labs Selection"
        columns={LabsColumn}
        data={labs}
        setSelectedRows={setLabs}
      ></DataTable>
    </div>
  );
}
