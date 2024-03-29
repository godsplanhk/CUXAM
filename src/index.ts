import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import ControllerRouter from "./apis/controller/controller.js";
import cors from 'cors';
import "express-async-errors";
dotenv.config()
const PORT = process.env.PORT|| 3000;
const app = express();
app.use(cors());
app.options('*', cors()) // include before other routes
app.use(express.json({limit: '200kb'}));
app.use('/api/v1',ControllerRouter);
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err.stack)
    console.error(err.name);
    console.error(err.message);
    res.status(500).send('Something broke!')
    return;
  })
app.listen(PORT,()=>{
    console.log("App listening on port", PORT);
})
