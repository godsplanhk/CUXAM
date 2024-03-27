import express from 'express';
import { getExamAtoms } from '../../../data/queries.js';
import { Generate } from '../../../algo/generate.js';
import cors from 'cors';
const router = express.Router();

router.post('/getSchedule',async (req,res)=>{
    const body = (req.body);
    const batches = body.batches;
    const batchesId = batches.map((e: { id: string; }) => e.id);
    const labs = body.labs;
    const teachers = body.teachers;
    let dates = body.dates;
    dates = dates.map((e: string| Date)=>new Date(e));
    const DatesheetRes = await Generate(batchesId,labs,dates,teachers);
    res.json(DatesheetRes).header({'Access-Control-Allow-Origin': '*',});
});

export default router;