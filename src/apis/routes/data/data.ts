import express from "express";
import { prisma } from '../../../data/client.js';

const router = express.Router();

router.get('/branches',async (req,res)=>{
    res.send(await prisma.branch.findMany({
        select: {
            id:true,
            batches: true
        }
    }));
})

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
        }));
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
