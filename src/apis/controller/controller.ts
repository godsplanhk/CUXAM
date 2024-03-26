import express from "express";
import dataRouter from '../routes/data/data.js'
const router = express.Router();
router.use('/data',dataRouter);
export default router;


