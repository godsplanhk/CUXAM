import { prisma } from "../src/data/client.js";
import { batchGenerator, teacherGenerator } from "../src/lib/utils.js";
import {  branch, course, rooms } from "./seedsData.js";
import iTeacherData from "../files/iTeacher_0.json" with {type: "json"};
import sectionData from "../files/section_0.json" with {type: "json"};
import { createUser } from "../src/lib/user.js";
import { error } from "console";
async function main() {
    console.log("hi");
    await prisma.degree.createMany({
        data: [{ "id": "BE" }, { "id": "ME" }]
    });
    await prisma.branch.createMany({
        data: branch
    });
    const batches = batchGenerator("Odd", 23, await prisma.branch.findMany());
    batches.push({ "id": "24MCC", "branch": "MCC", "semester": "1", "BEME": "ME" });
    await prisma.batches.createMany({
        data: batches
    });
    await prisma.section.createMany({
    data : sectionData
}
);
await prisma.course.createMany({
    data: course
});

await prisma.teacher.createMany({
    data: teacherGenerator()
});
await prisma.iTeacher.createMany({
    data: iTeacherData
});
// for (const b of iTeacherData) {   
//     try {
        
        
//     }
//     catch (PrismaClientKnownRequestError) {
//         console.log(PrismaClientKnownRequestError)
//         console.log(b)
//     }
// }
await prisma.rooms.createMany({
    data: rooms
    });
    // await prisma.softSkillSchedule.createMany({
    //     data: softSkill
    // });
await createUser("hk", "krishna", "Hare Krishna");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });