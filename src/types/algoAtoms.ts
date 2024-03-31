export type Teacher = {
    ECode: string;
    Tname: string;
    tags: string[];
}
export type Rooms = {
    labNo: string;
    block: string;
    capacity: number;
}
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
        date: string
        timeSlot: number;
    }