import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({message:'Enter a Valid email'}),
    password:z.string()
})

export type TloginSchema = z.infer<typeof loginSchema>

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email({message:'Enter a Valid email'}),
    password:z.string()
})

export type TuserSchema = z.infer<typeof userSchema>