import express from 'express';
import { Generate } from '../../../algo/generate.js';
import { auth } from '../../middlewares/auth.js';
import { date } from 'zod';
const router = express.Router();

router.post('/getSchedule',async (req,res)=>{
    const body = (req.body);
    const batches = body.batches;
    const batchesId = batches.map((e: { id: string; }) => e.id);
    const labs = body.labs;
    const teachers = body.teachers;
    let dates = body.dates;
    const Udates:Date[] = dates.map((d: string) =>new Date(d));
    let DatesheetRes = await Generate(batchesId, labs, Udates, teachers);
    while (DatesheetRes.unschedule.length !=0)DatesheetRes = await Generate(batchesId, labs, Udates, teachers);
    res.header({'Access-Control-Allow-Origin': '*',}).json(DatesheetRes);
});

export default router;