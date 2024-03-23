import express from "express";
import doteven from "dotenv";
import ControllerRouter from "./apis/controller/controller.js";

doteven.config()
const PORT = process.env.PORT|| 3000;
const app = express();

app.use(express.json());
app.use('/api/v1',ControllerRouter);

app.listen(PORT,()=>{
    console.log("App listening on port", PORT);
})
