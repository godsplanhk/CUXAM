import { Batches, Rooms, Section, Teacher } from "@prisma/client";
import { getAllRooms, getAllSections, getAllTeachers, getExamAtoms } from "../data/queries.js";
import { getVenueAtoms } from "./utils/venueAtoms.js";
import { Population } from "./populate.js";
import xlsx, { IJsonSheet,IContent } from 'json-as-xlsx';
import { fitnessCheckConsecutiveExam } from "./fitness.js";

export async function Generate(batches:string[],rooms:Rooms[],date: Date[],teacher: Teacher[]){
    const section = await getAllSections(batches);
   const examAtoms = await getExamAtoms(section);
   const venueAtoms = getVenueAtoms(rooms,date);
   const selectedTeacher = teacher.filter(teacher=>teacher.tags.length==1&&teacher.tags[0]=='CSE');
   const population = await Population(examAtoms,venueAtoms,selectedTeacher)
   const fitness = fitnessCheckConsecutiveExam(section,population.schedule,date)
   
    return {schedule:population.schedule,unschedule: population.unscheduled,fitness: 100-fitness, venueAtoms: venueAtoms};
}