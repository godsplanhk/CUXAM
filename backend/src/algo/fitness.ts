import { Schedule, Section } from "@prisma/client";
import { lSchedule } from "../types/algoAtoms.js";
import { getAllSections } from "../data/queries.js";
const testSchedule:lSchedule[] = (JSON.parse(await Bun.file("/home/hk/Project/cuxam_algorithm/backend/src/algo/schedule.json").text())['data']) as lSchedule[];
testSchedule.forEach(e=>e.venue.date= new Date(e.venue.date));
export function fitnessCheckConsecutiveExam(section: Section[],schedule:lSchedule[],dates:Date[]){
    console.log(section.length,dates.length)
    const fitness:number[] = [];
    for(let s of section){
        const sectionSchedule = schedule.filter((element)=>element.exam.sec.id ==s.id);
        for(let d of dates){
            const todaySchedule = sectionSchedule.filter((element)=>element.venue.date.getTime()===d.getTime());
            if(todaySchedule.length==2){
                if(todaySchedule[1].venue.timeSlot-todaySchedule[1].venue.timeSlot==1){
                    console.log(todaySchedule);
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
    console.log(fitness.length);
    return fitness.reduce((a,b)=>a+b,0);
}


console.log(fitnessCheckConsecutiveExam(await getAllSections(),testSchedule,[new Date(2024,3,24),new Date(2024,3,25),new Date(2024,3,26),new Date(2024,3,27),new Date(2024,3,28)]));
