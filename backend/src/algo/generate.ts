import { Rooms, Section } from "@prisma/client";
import { getAllRooms, getAllSections, getExamAtoms } from "../data/queries.js";
import { getVenueAtoms } from "./utils/venueAtoms.js";

export async function Generate(section:Section[],rooms:Rooms[],date: Date[]){
    const examAtoms = await getExamAtoms(section);
    const VenueAtoms = await getVenueAtoms(rooms,date);
    if(examAtoms.length>VenueAtoms.length){
        console.log("All exams cannot be completed in the given timeframe as ",examAtoms.length-VenueAtoms.length," exams are extra");
    }
    console.log(examAtoms,VenueAtoms,examAtoms.length,VenueAtoms.length)
}

await Generate(await getAllSections(),await getAllRooms(),[new Date(2024,3,16),new Date(2024,3,17)])