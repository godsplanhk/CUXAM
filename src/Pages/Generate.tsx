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
      <div className="md:col-span-3">
        <div className=" m-2 rounded-sm shadow-md border p-2 hover:shadow-md hover:shadow-green-500 h-min justify-center">
            <ErrorBoundary fallbackRender={fallbackRender} onError  ={()=>batchRefresh()}>
          <Suspense fallback={<Loader/>}>
            <BatchSelection />
          </Suspense>
            </ErrorBoundary>
        </div>
      </div>
      <div className=" justify-center w-auto md:col-span-3 my-2 rounded-sm shadow-md border p-2 h-min hover:shadow-md hover:shadow-green-500">
        <div>
          <DatePickerSelection />
        </div>
        <ErrorBoundary fallbackRender={fallbackRender} onError={()=>labRefresh()}>
        <Suspense fallback={<Loader/>}>
          <RoomSelection />
        </Suspense>
        </ErrorBoundary>
      </div>
      <div className="md:col-span-4 m-2 rounded-sm shadow-md border p-2 h-min hover:shadow-md hover:shadow-green-500 overflow-auto">
      <ErrorBoundary fallbackRender={fallbackRender} onError={()=>teacherRefresh()}>
      <Suspense fallback={<Loader/>}>
          <TeacherSelection />
        </Suspense>
        </ErrorBoundary>
      </div>
      <div></div>
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
        columns={teacherColumns}
        data={teacher}
        setSelectedRows={sTeacher}
      ></DataTable>
    </div>
  );
}

function BatchSelection() {
  const batches = useRecoilValue(batchState);
  const [selectedBatches, sBatches] = useRecoilState(selectedBatchState);

  return (
    <div>
      <div>
        <p className="text-left my-2">Choose Batch</p>
        {Selection("Batches", selectedBatches.length)}
      </div>
      <DataTable
        columns={Batchcolumns}
        data={batches}
        setSelectedRows={sBatches}
      ></DataTable>
    </div>
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
        columns={LabsColumn}
        data={labs}
        setSelectedRows={setLabs}
      ></DataTable>
    </div>
  );
}
