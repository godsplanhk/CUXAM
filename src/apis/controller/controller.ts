import express from "express";
import dataRouter from '../routes/data/data.js'
import algoRouter from '../routes/algo/generate.js'
import authRouter from '../routes/auth/auth.js'
import adminRouter from "../routes/admin/admin.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();
router.use('/data',auth,dataRouter);
router.use('/algo',auth,algoRouter);
router.use('/auth',authRouter);
router.use('/admin',adminRouter);
export default router;


