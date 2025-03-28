import { Batches, Branch,SoftSkillSchedule,Teacher } from "@prisma/client";
import { prisma } from "../data/client.js";
import teacherData from "../../files/teacher_0.json" with {type: "json"};
import softSkillData from "../../files/SoftSkill_0.json" with {type: "json"};
type FacultyMember = {
    post: string;
    gender: string;
    name: string;
    designation: string;
    ECode: string;
};
export function batchGenerator(semester: "Odd" | "Even", fresherYear: number, branches: Branch[]): Batches[]{
    let sem = semester === "Even" ? 2 : 3;
    const batches:Batches[] = []
    for (const branch of branches) {
        for (let i = 0; i < 3; i++){
            if (branch.id[0] !== "M") {   
                batches.push({ "id": `${fresherYear-i}${branch.id}`, "branch": branch.id, "semester": `${3+2*i}`, "BEME": "BE" });    
            }
        }
    }
    return batches;
}


export function teacherGenerator(data:FacultyMember[] = teacherData):Teacher[] {
    const teacher: Teacher[] = [];
    const re = new RegExp(/program|hod|director/i);
    const facultyRe = new RegExp(/CSE/i);
    for (const t of data) {
        const teacherData:{[key:string]: string|string[]}= {};
        teacherData.Tname = t.name;
        teacherData.ECode = t.ECode;
        teacherData.gender = t.gender;
        if (facultyRe.test(t.post)) {
            teacherData.tags = ["CSE"];
        }
        else {
            teacherData.tags = [t.post];
        }
        if (re.test(t.designation)) {
            const designations = t.designation.split("-");
            if (Array.isArray(teacherData.tags)) {
                if (designations.length === 1) teacherData.tags.push(...designations);
                else if (designations.length > 1) teacherData.tags.push(designations[1]);
            }

        }
        teacher.push({Tname:teacherData.Tname,ECode:teacherData.ECode,gender: teacherData.gender,tags:teacherData.tags});
    }
    return teacher;
    }

export function softSkillImporter(data: typeof softSkillData=softSkillData):SoftSkillSchedule[]{
    const timeToTimeSlot: { [key: string]: number; } = { "09:30": 1, "11:15": 2, "01:15": 3, "03:00": 4 };
    const imported: SoftSkillSchedule[] = [];
    for (const d of data) {
        imported.push({created: new Date(),sectionId:d.sectionId,Ccode:d.Ccode,Cname:d.Cname,dateIndex:null,IEcode:d.IEcode,ITname:d.ITname,labNo:`${d.labNo}`,block:d.block,capacity:`${d.capacity}`,date:new Date(d.date),timeSlot:timeToTimeSlot[d["Start time"]],EEcode:d.EEcode,ETname:d.ETname,tags:["DCPD"]})
    }
    return imported;
}

await prisma.softSkillSchedule.createMany({data:softSkillImporter()});