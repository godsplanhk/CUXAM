import { Rooms, Schedule, Teacher, ITeacher, SoftSkillSchedule, Section } from '@prisma/client';
import { prisma } from "../../data/client.js";
import { lSchedule } from "../../types/algoAtoms.js";

export function convertlScheduleToDBSchedule(e: lSchedule):Schedule {
    return (
        {created: new Date(),
            internal: e.exam.teacher.ECode,
            Ccode: e.exam.course.code,
            sectionId: e.exam.sec.id,
            capacity: e.exam.sec.capacity,
            labNo: e.venue.labNo,
            block: e.venue.block,
            date: e.venue.date,
            timeSlot: e.venue.timeSlot,
            external: e.external.ECode
        }
        )
  }
export interface ScheduleQuery extends Schedule{
    lab: Rooms
    externalR: Teacher
    iTeacher: Teacher
}
// export async function convertDBScheduleTolSchedule(e: ScheduleQuery):Promise<lSchedule>{

//     return {
//         exam: {Ccode:e.Ccode,Teacher: e.iTeacher.ECode,sec:{id:e.sectionId,capacity:e.capacity}},
//         venue: {labNo:e.labNo,block:e.block,capacity:e.lab.capacity,date: e.date, timeSlot:e.timeSlot},
//         external:e.externalR
//     }
// }
export interface SoftSkillConverterProps extends SoftSkillSchedule{
    sec: {
        id: string;
        capacity: number;
        batchR: {
            branch: string;
            semester: string;
            BEME: string;
        }}
};
export function convertSoftSkillTolSchedule(softSch:SoftSkillConverterProps,date: Date[]){
    if(date.length<=4)
    {
        return {
        exam: {
            teacher:{
                ECode: softSch.IEcode,
                Tname: softSch.ITname
            },
            sec:softSch.sec,
            course:{
                code: softSch.Ccode,
                Cname: softSch.Cname,
        }
    },
    venue: {
        labNo: softSch.labNo,
        block: softSch.block,
        capacity: parseInt(softSch.capacity),
        date: softSch.date,
        timeSlot: softSch.timeSlot
    },
    external: {
        ECode: softSch.EEcode,
        Tname: softSch.ETname,
        tags: softSch.tags,
        gender: 'NA'

    }
    }
    }
    else {
        return {
            exam: {
                teacher:{
                    ECode: softSch.IEcode,
                    Tname: softSch.ITname
                },
                sec:softSch.sec,
                course:{
                    code: softSch.Ccode,
                    Cname: softSch.Cname,
            }
        },
        venue: {
            labNo: softSch.labNo,
            block: softSch.block,
            capacity: parseInt(softSch.capacity),
            date: date[softSch.dateIndex?softSch.dateIndex-1:0],
            timeSlot: softSch.timeSlot
        },
        external: {
            ECode: softSch.EEcode,
            Tname: softSch.ETname,
            tags: softSch.tags,
            gender: 'NA'
    
        }
        }
    }
}