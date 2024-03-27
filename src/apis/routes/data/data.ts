import express from "express";
import { prisma } from '../../../data/client.js';
import { getExamAtoms } from "../../../data/queries.js";
import { Section, Batches } from '@prisma/client';

const router = express.Router();
router.get('/batches',async (req,res)=>{
    res.send(await prisma.batches.findMany());
})

router.get('/rooms',async (req,res)=>{
    res.send(await prisma.rooms.findMany());
})

router.get('/sections',async (req,res)=>{
    if(req.body==undefined){
        res.send(await prisma.section.findMany());
    }
    else{
        const batches = req.body;
        res.send(await prisma.section.findMany({
            where:{
                batch:{
                    in: batches
                }
            }
        }))
    }
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
export default router;
