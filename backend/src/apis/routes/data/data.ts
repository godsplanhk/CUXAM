import express from "express";
import { prisma } from '../../../data/client.js';
import { getExamAtoms } from "../../../data/queries.js";

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
router.post('/getExamAtoms',async (req,res)=>{
    const section = req.body;
    res.send(await getExamAtoms(section));
})
export default router;
