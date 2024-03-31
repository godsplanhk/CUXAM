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
                    batchR:{
                        select:{
                            BEME: true,
                            branch: true,
                            semester: true,
                        }
                    }
                }
            },
            course:{
                select: {
                    code: true,
                    Cname: true,
                }
            },
            teacher:{
                select:{
                    ECode: true,
                    Tname: true
                }
            }
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

export async function getAllSections(batches?:string[]){
    if(batches==undefined){
    return await prisma.section.findMany();}
    else{
        return await prisma.section.findMany({
            where: {
                batch:{
                    in: batches
                }
            }
        })
    }
}

export async function getAllTeachers(){
    return await prisma.teacher.findMany();
}