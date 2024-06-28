import { Turn as Hamburger } from "hamburger-react";
import { cn } from "../../lib/utils";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isSidebarOpenState } from "@/state/atoms/sidebar";
import { Button } from "./button";
import { selectedBatchState } from "@/state/atoms/batch";
import { datesState } from "@/state/atoms/dateRange";
import { selectedTeacherState, TeacherProp, teachersSelector } from "@/state/atoms/teachers";
import { selectedLabsState } from "@/state/atoms/labs";
import api from "../../utils/axiosInstance.js";
// import * as XLSX from 'xlsx';
import xlsx from "json-as-xlsx"
// import { saveAs } from 'file-saver'
import { useLocation, useNavigate } from "react-router-dom";
import { GenerateNavbarState } from "@/state/atoms/navbar";
import { lSchedule, ExamAtom, VenueAtoms } from '../../types/algoAtoms';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { LogOut } from "lucide-react";
import { Vortex } from "react-loader-spinner";
import { useState } from "react";
interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const timeSlotDict: Record<number, { startTime: string, endTime: string }> = {
  1: { startTime: "09:30", endTime: "11:00" },
  2: { startTime: "11:15", endTime: "12:45" },
  3: { startTime: "01:15", endTime: "02:45" },
  4: { startTime: "03:00", endTime: "04:30" },
}


export function Navbar({ className, children, ...props }: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const location = useLocation();
  const isGeneratePage = location.pathname === '/generate';
  const signOut = useSignOut();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const NavInfo = useRecoilValue(GenerateNavbarState);
  api.defaults.headers['Authorization'] = authHeader?.split(' ')[1] ?? null;
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
      {isGeneratePage && <div className="w-full text-center">
        Schedule: {NavInfo.scheduled} Unscheduled : {NavInfo.unscheduled} Fitness: {NavInfo.fitness}
      </div>}
      <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => {
        signOut();
        navigate('/login');
      }}>
        <LogOut />
      </Button>
      {children}
    </div>
  );
}
interface GenerateProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export function GenerateBar({ className, ...props }: GenerateProps) {
  const sBatches = useRecoilValue(selectedBatchState);
  const sDates = useRecoilValue(datesState);
  const sTeacher = useRecoilValue(selectedTeacherState);
  const teacher = useRecoilValue(teachersSelector);
  const sLabs = useRecoilValue(selectedLabsState);
  const setNavInfo = useSetRecoilState(GenerateNavbarState);
  const [generate, setGenerate] = useState(false);
  return (
    <div
      className={cn("flex justify-center items-center h-16", className)}
      {...props}
    >
      <Button
        className="mr-2 shadow-md bg-green-500 hover:bg-green-700 w-11/12 text-base"
        variant="outline" disabled={generate}
        onClick={
          async () => {
            setGenerate(true);
            const data = [];
            sDates?.forEach(d => {
              d.setHours(5);
              d.setMinutes(30);
            })
            const dateSheet = await api.post(
              "algo/getSchedule",
              {
                batches: sBatches,
                dates: sDates,
                teachers: sTeacher,
                labs: sLabs,
              },
              { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } }
            );
            const excelData = dateSheet.data.schedule.map((s: lSchedule) => {
              return {
                "date": new Date(s.venue.date).toLocaleDateString(),
                "st": timeSlotDict[s.venue.timeSlot].startTime,
                "et": timeSlotDict[s.venue.timeSlot].endTime,
                "course": s.exam.sec.batchR.BEME,
                "branch": s.exam.sec.batchR.branch,
                "semester": s.exam.sec.batchR.semester,
                "sname": s.exam.course.Cname,
                "scode": s.exam.course.code,
                "section": s.exam.sec.id.split('/')[0],
                "group": s.exam.sec.id.split('/')[1],
                "capacity": s.exam.sec.capacity,
                "block": s.venue.block,
                "labNo": s.venue.labNo,
                "IEname": s.exam.teacher.Tname,
                "IEcode": s.exam.teacher.ECode,
                "EEname": s.external.Tname,
                "EEcode": s.external.ECode
              }
            });
            data.push({
              sheet: "Combined",
              columns: [
                { label: "Date", value: "date" },
                { label: "Start Time", value: "st" },
                { label: "End Time", value: "et" },
                { label: "Course", value: "course" },
                { label: "Branch", value: "branch" },
                { label: "Semester", value: "semester" },
                { label: "Subject Name", value: "sname" },
                { label: "Subject Code", value: "scode" },
                { label: "Class With Section", value: "section" },
                { label: "Group", value: "group" },
                { label: "Total Students", value: "capacity" },
                { label: "Block", value: "block" },
                { label: "Lab No.", value: "labNo" },
                { label: "Internal Examiner", value: "IEname" },
                { label: "Internal ECode", value: "IEcode" },
                { label: "External Examiner", value: "EEname" },
                { label: "External ECode", value: "EEcode" }
              ],
              content: excelData
            })
            const unscheduleExceldata = dateSheet.data.unschedule.map((e: ExamAtom) => {
              return {
                "section": e.sec.id,
                "sname": e.course.Cname,
                "scode": e.course.code,
                "Tname": e.teacher.Tname,
                "TEcode": e.teacher.ECode,

              }
            })
            data.push({
              sheet: "Unscheduled",
              columns: [
                { label: "Section", value: "section" },
                { label: "Subject", value: "sname" },
                { label: "Subject Code", value: "scode" },
                { label: "Teacher", value: "Tname" },
                { label: "ECode", value: "TEcode" }
              ],
              content: unscheduleExceldata
            });
            // const unscheduleWorksheet = XLSX.utils.json_to_sheet(unscheduleExceldata);
            // const scheduleWorksheet = XLSX.utils.json_to_sheet(excelData);
            // const workbook = XLSX.utils.book_new();
            // XLSX.utils.book_append_sheet(workbook, scheduleWorksheet, "combined");
            // XLSX.utils.book_append_sheet(workbook, unscheduleWorksheet, "Unschedule");
            setNavInfo({ scheduled: dateSheet.data.schedule.length, unscheduled: dateSheet.data.unschedule.length, fitness: dateSheet.data.fitness });
            // Buffer to store the generated Excel file
            sDates?.forEach((d) => {
              const todaySchedule = dateSheet.data.schedule.filter((s: lSchedule) => s.venue.date.split('T')[0] === d.toISOString().split('T')[0]);
              const tData = teacher.map((t: TeacherProp) => {
                const scheduleCounter: Record<string | number, string | number | string[]> = { "Teacher Name": t.Tname, "ECode": t.ECode, 1: 0, 2: 0, 3: 0, 4: 0, "tags": t.tags.toString() };
                const TeacherSchedule = todaySchedule.filter((s: lSchedule) => (s.exam.teacher.ECode === t.ECode || s.external.ECode === t.ECode));
                [1, 2, 3, 4].forEach((ts) => {
                  const currentTimeslotSchedule: lSchedule[] = TeacherSchedule.filter((s: lSchedule) => s.venue.timeSlot === ts);
                  scheduleCounter[ts] = currentTimeslotSchedule.length == 0 ? 0 : (currentTimeslotSchedule[0].exam.teacher.ECode === t.ECode ? "I" : "E");
                })
                return { "tname": scheduleCounter['Teacher Name'], "ecode": scheduleCounter['ECode'], "tags": scheduleCounter['tags'], "1": scheduleCounter[1], "2": scheduleCounter[2], "3": scheduleCounter[3], "4": scheduleCounter[4] };
              })
              data.push({
                sheet: d.getDate().toString(),
                columns: [
                  { label: "Teacher Name", value: "tname" },
                  { label: "ECode", value: "ecode" },
                  { label: "Tags", value: "tags" },
                  { label: "9:30-11:00", value: "1", format: "General" },
                  { label: "11:15-12-45", value: "2", format: "General" },
                  { label: "1:15-2:45", value: "3", format: "General" },
                  { label: "3:00-4-30", value: "4", format: "General" },
                  {
                    label: "Internal", value: (row: Record<string, string>) => {
                      let count = 0;
                      ["1", "2", "3", "4"].forEach(s => {
                        if (row[s] == "I") count++;
                      })
                      return count;
                    }
                  },
                  {
                    label: "External", value: (row: Record<string, string>) => {
                      let count = 0;
                      ["1", "2", "3", "4"].forEach(s => {
                        if (row[s] == "E") count++;
                      })
                      return count;
                    }
                  },
                  {
                    label: "Total", value: (row: Record<string, string | number>) => {
                      let count = 0;
                      ["1", "2", "3", "4"].forEach(s => {
                        if (row[s] != 0) count++;
                      })
                      return count;
                    }
                  }
                ],
                content: tData
              });
              // const timeFree = XLSX.utils.json_to_sheet(tData);
              // XLSX.utils.book_append_sheet(workbook,timeFree,d.getDate().toString())
            })
            let temp = dateSheet.data.venueAtoms;
            temp = temp.map((e: VenueAtoms) => {
              return { "labNo": e.labNo, "block": e.block, "capacity": e.capacity, "date": (new Date(e.date)).toLocaleDateString(), "timeslot": timeSlotDict[e.timeSlot].startTime + '-' + timeSlotDict[e.timeSlot].endTime }
            })

            data.push({
              sheet: "Free Classes",
              columns: [
                { label: "Lab No.", value: "labNo" },
                { label: "Block", value: "block" },
                { label: "Capacity", value: "capacity" },
                { label: "Date", value: "date" },
                { label: "TimeSlot", value: "timeslot" }
              ],
              content: temp
            });

            // const freeVenue = XLSX.utils.json_to_sheet(temp);
            // XLSX.utils.book_append_sheet(workbook,freeVenue,"Free Classes")
            // const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            // const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            const settings = {
              fileName: "CUXAM DateSheet  " + (sDates ? sDates[0].toLocaleString().split(' ')[0].replace(",", "") : "1") + "-" + (sDates ? sDates[sDates.length - 1].toLocaleString().split(" ")[0].replace(",", "") : "2"), // Name of the resulting spreadsheet
              extraLength: 1, // A bigger number means that columns will be wider
              writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
              writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
              RTL: false, // Display the columns from right-to-left (the default value is false)
            }

            xlsx(data, settings)
            // saveAs(blob, "DateSheet.xlsx");
            setGenerate(false);
          }}
      >
        <Vortex
          visible={generate}
          ariaLabel="vortex-loading"
          height={'50'}
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
        {generate ? 'Generating' : 'Generate'}
      </Button>
    </div>
  );
}
