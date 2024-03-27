import React from "react";
import { Turn as Hamburger } from "hamburger-react";
import { cn } from "../../lib/utils";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isSidebarOpenState } from "@/state/atoms/sidebar";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { selectedBatchState } from "@/state/atoms/batch";
import { datesState } from "@/state/atoms/dateRange";
import { selectedTeacherState } from "@/state/atoms/teachers";
import { selectedLabsState } from "@/state/atoms/labs";
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import { useLocation } from "react-router-dom";
import { GenerateNavbarState } from "@/state/atoms/navbar";
interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
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
        <LogOut color="white" />
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
  return (
    <div
      className={cn("flex justify-between items-center h-16", className)}
      {...props}
    >
      <Button
        className="mr-2"
        variant="outline"
        size="sm"
        onClick={async () => {
          const dateSheet = await axios.post(
            "https://cuxam.azurewebsites.net/api/v1/algo/getSchedule",
            {
              batches: sBatches,
              dates: sDates,
              teachers: sTeacher,
              labs: sLabs,
            },
            { headers: { "Content-Type": "application/json" ,'Access-Control-Allow-Origin': '*' } }
          );
          const excelData = dateSheet.data.schedule.map((exam: { exam: { Ccode: string; sec: { id: string; capacity: string; }; Teacher: string; }; venue: { labNo: string; block: string; capacity: string; date: string; timeSlot: string; }; external: { ECode: string; }; })=>{return {Ccode:exam.exam.Ccode,sectionId:exam.exam.sec.id,capacity:exam.exam.sec.capacity,teacher:exam.exam.Teacher,labNo:exam.venue.labNo,block: exam.venue.block,labCapacity: exam.venue.capacity,date:exam.venue.date.split('T')[0],timeSlot:exam.venue.timeSlot,external:exam.external.ECode}})
          const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        setNavInfo({scheduled: dateSheet.data.schedule.length,unscheduled: dateSheet.data.unschedule.length,fitness: dateSheet.data.fitness});
        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        saveAs(blob, "data.xlsx");
        console.log(NavInfo);
        }}
      >
        Generate
      </Button>
      Schedule: {NavInfo.scheduled} Unscheduled : {NavInfo.unscheduled} Fitness: {NavInfo.fitness}
    </div>
  );
}
