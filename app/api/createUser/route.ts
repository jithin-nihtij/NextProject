import { PrismaClient } from '@prisma/client'
import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt'


const prisma = new PrismaClient()

export async function POST(req:Request){

    try{
        const {name,email,password} = await req.json()

        const existingUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(existingUser){
           return  NextResponse.json({message:'User already exists'})
        }    

        else{

            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await  bcrypt.hash(password,salt)

            const newUser = await prisma.user.create({
                data:{
                    name,
                    email,password:hashedPassword
                }
            })
    
            return NextResponse.json(newUser,{status:200})
        }

    }catch(err){
  
        return NextResponse.json({message:"Error Creating User"},{status:500})

    }
}