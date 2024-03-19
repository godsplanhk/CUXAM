import { Teacher } from '@prisma/client';
import { VenueAtoms, getVenueAtoms } from './utils/venueAtoms.js';
import { getAllRooms, getAllSections, getAllTeachers, getExamAtoms } from '../data/queries.js';
import xlsx, { IJsonSheet,IContent } from 'json-as-xlsx';

export interface Schedule{
    exam: ExamAtom,
    venue: VenueAtoms,
    // external: Teacher
}
export interface ExamAtom{
    Ccode: string;
    Teacher: string;
    sec: {
        id: string;
        capacity: number;
    }};
function MostPreferredVenue(exam:ExamAtom,venueAtoms:VenueAtoms[],schedule:Schedule[]):VenueAtoms|null{
    const capacity =exam.sec.capacity;
    const sectionSchedule = schedule.filter(s=>s.exam.sec.id===exam.sec.id);
    const internalTeacherSchedule = schedule.filter(s=>s.exam.Teacher===exam.Teacher);
    let selectedVenue:VenueAtoms|null=null;
    let i=0;
    for(let venue of venueAtoms){
        let free = true;
        const currentDayITeacherSchedule = internalTeacherSchedule.filter(s=>s.venue.date.getTime()==venue.date.getTime());
        for(let s of currentDayITeacherSchedule){
            if(s.venue.timeSlot===venue.timeSlot){
                free=false;
                break;
            }
        }
        if(free){
        const currentDaySchedule = sectionSchedule.filter(s=>s.venue.date.getTime()===venue.date.getTime());
        if(currentDaySchedule.length==0){
            selectedVenue = venue;
            venueAtoms.splice(i,1);
            break;
        }
        else if(currentDaySchedule.length<2){
            if(currentDaySchedule[0].venue.timeSlot!=venue.timeSlot){
                selectedVenue = venue;
                venueAtoms.splice(i,1);
                break;
            }
        }}
        i++;
        }
        return selectedVenue;
}
export function Population(examAtoms:ExamAtom[],VenueAtoms:VenueAtoms[],AvailableTeacher:Teacher[]){
    const schedule: Schedule[]=[];
    const unscheduled:ExamAtom[] = [];
    const rows:IContent[]=[];
    const scheduleSheet:IJsonSheet[] = [
        {
            sheet: "combined",
            columns:[
                {label:"Course Code",value:"Ccode"},
                {label:"Section",value:"sectionId"},
                {label:"Capacity",value:"capacity"},
                {label:"Internal Teacher",value:"teacher"},
                {label:"Lab No.",value:"labNo"},
                {label:"Block",value:"block"},
                {label:"Lab Capacity",value:"labCapacity"},
                {label:"Date",value:"date"},
                {label:"Slot",value:"timeSlot"},
            ],
            content:rows
        }
    ]
    VenueAtoms.sort(()=>Math.random()-0.5);
    examAtoms.forEach(exam=>{
        let venue = MostPreferredVenue(exam,VenueAtoms,schedule)
        if(venue ===null){
            unscheduled.push(exam);
        }
        else{
            schedule.push({exam: exam,venue: venue});
            rows.push({Ccode:exam.Ccode,sectionId:exam.sec.id,capacity:exam.sec.capacity,teacher:exam.Teacher,labNo:venue.labNo,block: venue.block,labCapacity: venue.capacity,date:venue.date,timeSlot:venue.timeSlot});
        }
    })
    let settings = {
        fileName: "MySpreadsheet", // Name of the resulting spreadsheet
        extraLength: 4, // A bigger number means that columns will be wider
        writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
        writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
        // RTL: true, // Display the columns from right-to-left (the default value is false)
      };
    xlsx(scheduleSheet,settings);
    console.log("..........................");
    console.log(unscheduled);
    console.log(VenueAtoms);
}

Population(await getExamAtoms(await getAllSections()),getVenueAtoms(await getAllRooms(),[new Date(2024,3,18),new Date(2024,3,19),new Date(2024,3,20)]),await getAllTeachers());