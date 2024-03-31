import React, { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { cn } from "../../lib/utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { isSidebarOpenState } from "@/state/atoms/sidebar";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { selectedBatchState } from "@/state/atoms/batch";
import { datesState } from "@/state/atoms/dateRange";
import { selectedTeacherState } from "@/state/atoms/teachers";
import { selectedLabsState } from "@/state/atoms/labs";
import api from "../../utils/axiosInstance.js";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import { useLocation } from "react-router-dom";
import { GenerateNavbarState } from "@/state/atoms/navbar";
import { lSchedule,ExamAtom } from '../../types/algoAtoms';
import LoadingBar from 'react-top-loading-bar';
interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const timeSlotDict: Record<number,{startTime:string,endTime:string}>={
  1: {startTime: "09:30", endTime:"11:00"},
  2: {startTime: "11:15", endTime:"12:45"},
  3: {startTime: "01:15", endTime:"02:45"},
  4: {startTime: "03:00", endTime:"04:30"},
}


export function Navbar({ className, children, ...props }: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const location = useLocation();
  const isGeneratePage = location.pathname === '/generate'; 
  return (
    <div
      className={cn("flex justify-between items-center h-16", className)}
      {...props}
    >
      <Hamburger
        size={26}
        toggled={isSidebarOpen}
        toggle={setIsSidebarOpen}
      ></Hamburger>
        {isGeneratePage && <GenerateNavBar></GenerateNavBar>}
      <Button variant="outline" size="sm" className="mr-20">
        <LogOut/>
      </Button>
      {children}
    </div>
  );
}
interface GenerateProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
function GenerateNavBar({ className, ...props }: GenerateProps) {
  const sBatches = useRecoilValue(selectedBatchState);
  const sDates = useRecoilValue(datesState);
  const sTeacher = useRecoilValue(selectedTeacherState);
  const sLabs = useRecoilValue(selectedLabsState);
  const [NavInfo,setNavInfo] = useRecoilState(GenerateNavbarState);
  const [progress,setProgress]=useState(0);
  return (
    <div
      className={cn("flex justify-between items-center h-16", className)}
      {...props}
    >
      <LoadingBar color={"#FF0000"} progress={progress} onLoaderFinished={()=>setProgress(0)}></LoadingBar>
      <Button
        className="mr-2"
        variant="outline"
        size="sm"
        onClick={
          async () => {
            setProgress(50);
          const dateSheet = await api.post(
            "algo/getSchedule",
            {
              batches: sBatches,
              dates: sDates,
              teachers: sTeacher,
              labs: sLabs,
            },
            { headers: { "Content-Type": "application/json" ,'Access-Control-Allow-Origin': '*' } }
          );
          setProgress(50);
          const excelData = dateSheet.data.schedule.map((s: lSchedule)=> {
            setProgress(progress+5/dateSheet.data.schedule.length);
            return {
              "Date": s.venue.date.split('T')[0],
              "Start Time": timeSlotDict[s.venue.timeSlot].startTime,
              "End Time": timeSlotDict[s.venue.timeSlot].endTime,
              "Course": s.exam.sec.batchR.BEME,
              "Branch": s.exam.sec.batchR.branch,
              "Semester": s.exam.sec.batchR.semester,
              "Subject Name": s.exam.course.Cname,
              "Subject Code": s.exam.course.code,
              "Class With Section": s.exam.sec.id.split('/')[0],
              "Group": s.exam.sec.id.split('/')[1],
              "Total Students": s.exam.sec.capacity,
              "Block":s.venue.block,
              "Lab No.": s.venue.labNo,
              "Internal Examiner": s.exam.teacher.Tname,
              "Internal ECode ": s.exam.teacher.ECode,
              "External Examiner": s.external.Tname,
              "External ECode": s.external.ECode
          }
          });
          const unscheduleExceldata = dateSheet.data.unschedule.map((e:ExamAtom)=>{
            setProgress(progress+5/dateSheet.data.unschedule.length)
            return{
              "Section":e.sec.id,
              "Subject": e.course.Cname,
              "Subject Code":e.course.code,
              "Teacher":e.teacher.Tname,
              "ECode":e.teacher.ECode,

            }
          })
          const scheduleWorksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, scheduleWorksheet, "combined");
        XLSX.utils.book_append_sheet(workbook, unscheduleExceldata, "Unschedule");
        setNavInfo({scheduled: dateSheet.data.schedule.length,unscheduled: dateSheet.data.unschedule.length,fitness: dateSheet.data.fitness});
        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        setProgress(100);
        saveAs(blob, "data.xlsx");
        }}
      >
        Generate
      </Button>
      Schedule: {NavInfo.scheduled} Unscheduled : {NavInfo.unscheduled} Fitness: {NavInfo.fitness}
    </div>
  );
}
