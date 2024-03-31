import { Rooms, Schedule, Teacher, ITeacher } from '@prisma/client';
import { prisma } from "../../data/client.js";
import { lSchedule } from "../../types/algoAtoms.js";

export function convertlScheduleToDBSchedule(e: lSchedule):Schedule {
    return (
        {created: new Date(),
            internal: e.exam.Teacher,
            Ccode: e.exam.Ccode,
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
export async function convertDBScheduleTolSchedule(e: ScheduleQuery):Promise<lSchedule>{

    return {
        exam: {Ccode:e.Ccode,Teacher: e.iTeacher.ECode,sec:{id:e.sectionId,capacity:e.capacity}},
        venue: {labNo:e.labNo,block:e.block,capacity:e.lab.capacity,date: e.date, timeSlot:e.timeSlot},
        external:e.externalR
    }
}