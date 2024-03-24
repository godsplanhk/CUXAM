import { Rooms } from "@prisma/client";
import { VenueAtoms } from "../../types/algoAtoms.js";
const slot:number[] = [1,2,3,4];
export function getVenueAtoms(rooms: Rooms[],dates:Date[]){
    const PossibleVenueAtoms:VenueAtoms[] = [];
    const TimeSlots:{date:Date,timeSlot:number}[]=[];
    dates.forEach((date)=>{
    slot.forEach(s=>{
        TimeSlots.push({date:date,timeSlot:s});
    });
    });
    rooms.forEach(room=>{
        TimeSlots.forEach(slot=>{
            PossibleVenueAtoms.push({
                labNo:room.labNo,block:room.block,capacity:room.capacity,date:slot.date,timeSlot:slot.timeSlot
            });
        });
    });
    return PossibleVenueAtoms;
}
