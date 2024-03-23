import type Course from "./course.js"

export interface Batch{
    batchId: string
    branch: string
    semester: string
    courses: Course[]           
}