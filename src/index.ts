import express from "express";
import dotenv from "dotenv";
import ControllerRouter from "./apis/controller/controller.js";
import cors from 'cors';
dotenv.config()
const PORT = process.env.PORT|| 3000;
const app = express();
app.use(cors());
app.options('*', cors()) // include before other routes
app.use(express.json({limit: '200kb'}));
app.use('/api/v1',ControllerRouter);
app.listen(PORT,()=>{
    console.log("App listening on port", PORT);
})
