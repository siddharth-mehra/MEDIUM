import z from "zod"; 

export const signupInput=z.object({
  email:z.string().email(),
  password:z.string().min(6),
  name:z.string().optional(),
})

export const signinInput=z.object({
  email:z.string().email(),
  password:z.string().min(6),
})

export const createblogInput=z.object({
  title:z.string(),
  content:z.string()
})

export const updateblogInput=z.object({
  id:z.string(),
  title:z.string(),
  content:z.string()
}) 

export type UpdateblogInput=z.infer<typeof updateblogInput>
export type  CreateblogInput=z.infer<typeof createblogInput>
export type SignInInput=z.infer<typeof signinInput>
export type SignUpInput=z.infer<typeof signupInput>