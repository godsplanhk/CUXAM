import express from "express";
import { prisma } from '../../../data/client.js';

const router = express.Router();

router.get('/batches',async (req,res)=>{
    res.send(await prisma.batches.findMany());
})

router.get('/rooms',async (req,res)=>{
    res.send(await prisma.rooms.findMany());
})

export default router;
