import { Section } from "@prisma/client";
import { prisma } from "./client.js";

export async function getExamAtoms(sections: Section[]){
    return await prisma.iTeacher.findMany(
        {
            select:{
            sec:{
                select:{
                    id:true,
                    capacity:true,
                }
            },
            Ccode:true,
            Teacher:true
        },
            where:{
                section:{
                    in: sections.map(section=>section.id)
                }
            }
        },
    )
};

export async function getAllRooms() {
    return await prisma.rooms.findMany();
}

export async function getAllSections(){
    return await prisma.section.findMany();
}

export async function getAllTeachers(){
    return await prisma.teacher.findMany();
}