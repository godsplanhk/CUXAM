import { Rooms, Teacher } from "@prisma/client";

export interface lSchedule{
    exam: ExamAtom,
    venue: VenueAtoms,
    external: Teacher
}
export interface ExamAtom{
    Ccode: string;
    Teacher: string;
    sec: {
        id: string;
        capacity: number;
    }};
    export interface VenueAtoms extends Rooms {
        date: Date
        timeSlot: number;
    };