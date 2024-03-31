import { Teacher } from '@prisma/client';

import { ExamAtom, lSchedule, VenueAtoms } from '../types/algoAtoms.js';


function MostPreferredVenue(exam:ExamAtom,venueAtoms:VenueAtoms[],schedule:lSchedule[],teacher: Teacher[]):{venue:VenueAtoms|null,external:Teacher|null}{
    const capacity =exam.sec.capacity;
    const sectionSchedule = schedule.filter(s=>s.exam.sec.id===exam.sec.id);
    const internalTeacherSchedule = schedule.filter(s=>s.exam.teacher.ECode===exam.teacher.ECode||s.external.ECode===exam.teacher.ECode);
    let selectedVenue:VenueAtoms|null=null;
    let externalTeacher: Teacher|null = null;
    let maxCapacity = 0;
    let preferredVenue:{venue:VenueAtoms,ind: number,external: Teacher}[]|null = [];
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
        externalTeacher = MostPreferredExternal(exam.teacher.ECode,venue,teacher,schedule);
        if(externalTeacher===null){
            i++;
            continue;
        }
        if(free){
        const currentDaySchedule = sectionSchedule.filter(s=>s.venue.date.getTime()===venue.date.getTime());
        if(currentDaySchedule.length==0){
            if(venue.capacity<exam.sec.capacity){
                preferredVenue.push({venue:venue,ind:i,external:externalTeacher});
                i++;
                continue;
            }
            selectedVenue = venue;
            venueAtoms.splice(i,1);
            break;
        }
        else if(currentDaySchedule.length<2){
            if(currentDaySchedule[0].venue.timeSlot!=venue.timeSlot){
                if(venue.capacity<exam.sec.capacity){
                    preferredVenue.push({venue:venue,ind:i,external:externalTeacher});
                    i++;
                    continue;
                }
                selectedVenue = venue;
                venueAtoms.splice(i,1);
                break;
            }
        }}
        i++;
        }
        if(selectedVenue ===null){
            if(preferredVenue.length!==0){
                const bestFitVenue = preferredVenue.reduce((prev,current)=>(prev && prev.venue.capacity>current.venue.capacity)?prev:current);
                selectedVenue = bestFitVenue.venue;
                externalTeacher = bestFitVenue.external;
                venueAtoms.splice(bestFitVenue.ind,1);
            }
        }
        return {venue:selectedVenue,external:externalTeacher};
}

function MostPreferredExternal(internal: string,venue:VenueAtoms,teacher: Teacher[],schedule: lSchedule[]){
    teacher.sort(()=>Math.random()-0.5);
    for(let t of teacher){
        if(t.ECode!==internal){
        const externalSchedule = schedule.filter(s=>s.exam.teacher.ECode===t.ECode||s.external.ECode===t.ECode);
        const externalTodaySchedule = externalSchedule.filter(s=>s.venue.date.getTime()==venue.date.getTime())
        if(externalTodaySchedule.length<3){
            if(externalTodaySchedule.filter(s=>s.venue.timeSlot===venue.timeSlot).length===0){
                return t;
            }
        }}
    }
    return null;
}
export function Population(examAtoms:ExamAtom[],VenueAtoms:VenueAtoms[],AvailableTeacher:Teacher[]):{schedule:lSchedule[],unscheduled:ExamAtom[]}{
    const schedule: lSchedule[]=[];
    const unscheduled:ExamAtom[] = [];
    VenueAtoms.sort((a,b)=>a.capacity-b.capacity);
    examAtoms.sort(()=>Math.random()-0.5);
    examAtoms.forEach(exam=>{
        let venue = MostPreferredVenue(exam,VenueAtoms,schedule,AvailableTeacher)
        if(venue.venue ===null||venue.external===null){
            console.log(venue);
            unscheduled.push(exam);
        }
        else{
            schedule.push({exam: exam,venue: venue.venue,external:venue.external});
                }
    })
    return {schedule: schedule,unscheduled:unscheduled};}
// }
