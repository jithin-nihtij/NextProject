import { PrismaClient } from "@prisma/client";
import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'


const prisma = new PrismaClient()

export async function  POST(req:Request){

    try{
        const {email,password} = await req.json()
        const user = await prisma.user.findUnique({where:{email}})
        if(!user){
            return NextResponse.json({message:'User Not Found'},{status:404})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return NextResponse.json({message:'Invalid Password'},{status:401})
        }

        const tokenData = {
            id:user.id,
            email:user.email,
            username:user.name
        }

        const secretKey = process.env.JWT_SECRET_KEY ?? ''

        const token =  jwt.sign(tokenData,secretKey,{expiresIn:'1d'})

        const response = NextResponse.json({message:'Login Successfull',token})

        response.cookies.set("token",token,{httpOnly:true})
        
        return response
    
    }

    catch(error){
        return NextResponse.json({message:'Error'},{status:500})
    }
}