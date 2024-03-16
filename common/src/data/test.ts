import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
setTimeout(()=>console.log("hiiii"),10000)
const x = "Mr Shailesh Kumar	".toString()
console.log(await prisma.teacher.findMany({
    where:{
        Tname:{ 
            contains: x
        }
    }
}))
