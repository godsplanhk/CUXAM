import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { prisma } from '../data/client.js';
export async function createUser(username:string,password:string){
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password,salt ,1000,64,'sha512').toString('hex');
    const user = await prisma.user.create({
        data: {
            username: username,
            hash: hash,
            salt: salt
        }
    });
    return user;
}

export async function validatePassword(data:{username:string,password:string}){
    const user = await prisma.user.findUnique({
        where:{
            username: data.username
        }
    });

    console.log(await prisma.user.findMany());
    if(user){
        const hash = crypto.pbkdf2Sync(data.password,user.salt,1000,64,'sha512').toString('hex');
        if(hash===user.hash){
            return true;
        }
    }
    return false;
}