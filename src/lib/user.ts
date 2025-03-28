import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { prisma } from '../data/client.js';
export async function createUser(username:string,password:string,name:string){
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password,salt ,1000,64,'sha512').toString('hex');
    const user = await prisma.user.create({
        data: {
            username: username,
            hash: hash,
            salt: salt,
            name: name
        }
    });
    return user;
}

export async function validatePassword(data:{username:string,password:string}){
    const user = await prisma.user.findUnique({
        where:{
            username: data.username.toLowerCase().trim()
        }
    });

    if(user){
        const hash = crypto.pbkdf2Sync(data.password, user.salt, 1000, 64, 'sha512').toString('hex');
        console.log("hash", hash, "user", user.hash);
        if (hash === user.hash) {
            return {passwordCheck:true,user:user};
        }
    }
    return {passwordCheck:false,user:user};
}