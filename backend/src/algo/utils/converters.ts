import { Schedule } from "@prisma/client";
import { prisma } from "../../data/client.js";
import { lSchedule } from "../../types/algoAtoms.js";

export function convertlScheduleToDBSchedule(e: lSchedule):Schedule {
    return (
        {created: new Date(),
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
//TODO dbSch to lSchedule
// export  function convertDBScheduleTolSchedule(e: Schedule):lSchedule{
//     return {
//         exam: {Ccode:e.Ccode,Teacher: e.}
//     }
// }