import { Rooms, Teacher } from "@prisma/client";

export interface lSchedule{
    exam: ExamAtom,
    venue: VenueAtoms,
    external: Teacher
}
export interface ExamAtom{
    teacher: {
        ECode: string;
        Tname: string;
    };
        sec: {
        id: string;
        capacity: number;
        batchR: {
            branch: string;
            semester: string;
            BEME: string;
        };
    };
    course: {
        code: string;
        Cname: string;
    }}
    export interface VenueAtoms extends Rooms {
        date: Date
        timeSlot: number;
    };