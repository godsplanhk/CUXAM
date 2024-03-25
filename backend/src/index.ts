import express from "express";
import doteven from "dotenv";
import ControllerRouter from "./apis/controller/controller.js";
import cors from 'cors';
doteven.config()
const PORT = process.env.PORT|| 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1',ControllerRouter);

app.listen(PORT,()=>{
    console.log("App listening on port", PORT);
})
