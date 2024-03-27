import { Batches, Rooms, Section, Teacher } from "@prisma/client";
import { getAllRooms, getAllSections, getAllTeachers, getExamAtoms } from "../data/queries.js";
import { getVenueAtoms } from "./utils/venueAtoms.js";
import { Population } from "./populate.js";
import xlsx, { IJsonSheet,IContent } from 'json-as-xlsx';
import { fitnessCheckConsecutiveExam } from "./fitness.js";

export async function Generate(batches:string[],rooms:Rooms[],date: Date[],teacher: Teacher[]){

    const section = await getAllSections(batches);
   const examAtoms = await getExamAtoms(section);
   date= date.map(d=>new Date(d.getFullYear(),d.getMonth(),d.getDate()));
   const venueAtoms = getVenueAtoms(rooms,date);
   const res = Population(examAtoms,venueAtoms,teacher)
   const fitness = fitnessCheckConsecutiveExam(section,res.schedule,date)
   
    return {schedule:res.schedule,fitness: 100-fitness};
}