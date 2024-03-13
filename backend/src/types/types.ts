export interface Course{
    cName:String,
    cCode:String,
}

export interface Department{
    dCode:String,
    Courses: String[]
}


export interface Section{
    dCode:String,
    sCode:String,
}
export interface Venue{
    vCode:String,
    block:String,
}

export interface Teacher{
    tCode:String,
    cCode:String[],
    tSlot: TimeSlot[]
}

export interface TimeSlot{
    sTime: Date,
    eTime: Date
}

export interface LabMstSchedule{
    timeSlot: TimeSlot,
    venue: Venue,
    invigilator: Teacher,
    section: Section
}