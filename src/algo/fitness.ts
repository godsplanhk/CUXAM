import { Schedule, Section } from "@prisma/client";
import { lSchedule } from "../types/algoAtoms.js";
import { getAllSections } from "../data/queries.js";
export function fitnessCheckConsecutiveExam(section: Section[],schedule:lSchedule[],dates:Date[]){
    const fitness:number[] = [];
    for(let s of section){
        const sectionSchedule = schedule.filter((element)=>element.exam.sec.id ==s.id);
        for(let d of dates){
            const todaySchedule = sectionSchedule.filter((element)=>element.venue.date.getTime()===d.getTime());
            if(todaySchedule.length==2){
                if(todaySchedule[1].venue.timeSlot-todaySchedule[1].venue.timeSlot==1){
                    fitness.push(1);
                }
                else{
                    fitness.push(0);
                }
            }
            else{
                fitness.push(0)
            }
        }
    }
    return fitness.reduce((a,b)=>a+b,0);
}