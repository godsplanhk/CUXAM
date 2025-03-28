import  dotenv from 'dotenv';
import express from 'express';
import {z} from 'zod';
import { createUser, validatePassword } from '../../../lib/user.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET??'holaa';
const signUpSchema = z.object({
    username : z.string(),
    name: z.string(),
    password: z.string()
})

router.post("/signup",async (req,res)=>{
    const body = req.body;
    console.log(body);
    const parsedBody = signUpSchema.safeParse(body);
    if(parsedBody.success){
        const data = parsedBody.data;
        try{
            const username = data.username.toLowerCase().trim();
            const user = await createUser(username,data.password,data.name);
            const token = jwt.sign({username: username},JWT_SECRET);
            res.json({message: 'signup done', token: token});
        }
        catch(err){
            res.status(401).json(err);
        }
    }
    else{
        res.sendStatus(422);
    }

});

const signInSchema = z.object({
    username : z.string(),
    password: z.string()
})

router.post('/login',async(req,res)=>{
    const body = req.body;
    const parsedBody=signInSchema.safeParse(body);
    if(parsedBody.success){
        const data = parsedBody.data;
        try{
            const {passwordCheck,user} =await validatePassword(data);
            if(passwordCheck){
                const token = jwt.sign({username: data.username},JWT_SECRET,{expiresIn: '1h'});
                res.json({
                    message:'logged in',token: token,username:user?.username,name:user?.name,role:user?.role
                });
                return;
            }
            else{
                res.status(401).send('unauthorized');
                return;
            }
        }
        catch(err){
            res.status(401).json(err);
        }
    }
})

export default router;