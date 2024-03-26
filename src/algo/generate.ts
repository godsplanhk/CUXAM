import { Rooms, Section, Teacher } from "@prisma/client";
import { getAllRooms, getAllSections, getAllTeachers, getExamAtoms } from "../data/queries.js";
import { getVenueAtoms } from "./utils/venueAtoms.js";
import { Population } from "./populate.js";
import xlsx, { IJsonSheet,IContent } from 'json-as-xlsx';
import { fitnessCheckConsecutiveExam } from "./fitness.js";

export async function Generate(section:Section[],rooms:Rooms[],date: Date[],teacher: Teacher[]){
   const examAtoms = await getExamAtoms(section);
   const venueAtoms = getVenueAtoms(rooms,date);
   const res = Population(examAtoms,venueAtoms,teacher)
   const fitness = fitnessCheckConsecutiveExam(section,res.schedule,date)
   
    return {schedule:res.schedule,fitness: 100-fitness};
}
console.log((await Generate(await getAllSections(),await getAllRooms(),[new Date(2024,3,24),new Date(2024,3,25),new Date(2024,3,26),new Date(2024,3,27),new Date(2024,3,28)],await getAllTeachers())).fitness);