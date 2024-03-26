import express from "express";
import { prisma } from '../../../data/client.js';
import { getExamAtoms } from "../../../data/queries.js";
import { Section } from "@prisma/client";

const router = express.Router();
router.get('/batches',async (req,res)=>{
    res.send(await prisma.batches.findMany());
})

router.get('/rooms',async (req,res)=>{
    res.send(await prisma.rooms.findMany());
})

router.get('/sections',async (req,res)=>{
    res.send(await prisma.section.findMany());
})

router.get('/teachers',async(req,res)=>{
    res.send(await prisma.teacher.findMany({
        select:{
            ECode:true,
            Tname:true,
            internal: {
                select:{
                    course:{
                        select: {
                            Cname:true
                        }
                    }
                }
            }
        }
    }));
})
router.post('/generate',async (req,res)=>{
    const body = (req.body);
    const section = body.section; 
    console.log(section);
    res.send(await getExamAtoms(section));
})

router
export default router;
