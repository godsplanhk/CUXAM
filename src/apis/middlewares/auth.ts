import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET??'holaa';

interface customRequest extends Request{
    username?:string
}

export async function auth(req:customRequest,res:Response,next: NextFunction){
    try{
        const token = req.headers.authorization ?? req.cookies['next-auth.session-token'];
        console.log(req.cookies);
        if(token){
            const decoded = jwt.verify(token,JWT_SECRET) as {username: string};
            req.username = decoded.username ;
            next();
        }
        else{
            res.status(401).send('unauthorized');
        }
    }
    catch(err){
        console.log(err);
        res.status(401).send('unauthorized');
        return;
    }
}