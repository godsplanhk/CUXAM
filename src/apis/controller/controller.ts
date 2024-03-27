import express from "express";
import dataRouter from '../routes/data/data.js'
import algoRouter from '../routes/algo/generate.js'
const router = express.Router();
router.use('/data',dataRouter);
router.use('/algo',algoRouter);
export default router;


