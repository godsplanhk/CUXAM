import { Router } from "express";
import { prisma } from "../../../data/client.js";

const router = Router();

router.get("/getAllUser",async (req,res)=>{
    res.send(await prisma.user.findMany({select:{
        username: true,
        name:true,
        role:true,
    }}))
})

export default router;