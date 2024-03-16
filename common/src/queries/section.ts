import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
export async function getAllSections(){
    return await prisma.section.findMany({});
}

console.log(await getAllSections())