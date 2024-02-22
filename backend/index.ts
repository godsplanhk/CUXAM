import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.batch.create({
    data:{
        batchId:"21AML",
        branch: "AML",
        semester: 4, 
    }
})