import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import {sign} from 'hono/jwt';
import { signupInput,signinInput } from '@siddharthmehra/mid11common';

const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string;
    }
}>();

userRouter.post('/signup', async (c) => {
  const body=await c.req.json();
  const {success}=signupInput.safeParse(body);
 console.log(body)
  if(!success){
    c.status(403);
    return c.json({error:"invalid input"});
  }
  console.log(`hello is this body`,body)
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("Attempting to create user:",body);
    try {
        const user=await prisma.user.create({
          data:{
            email:body.email,
            password:body.password,
            name:body.name,
          }
        }) 
       console.log("User created successfully:",user);
        const token=await sign({id:user.id},'secret');
        return c.json({jwt:token});
        } catch (error) {
        c.status(403);
        console.log(error)
        return c.json({error:"user already exists"}); 
      }
    }
  );

userRouter.post('/signin',async (c) => {
  const body=await c.req.json();
  const {success}=signinInput.safeParse(body);
  if(!success){
    c.status(403);
    return c.json({error:"invalid input"});
  }
      const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
 
    const user=await prisma.user.findFirst({
      where:{
        email:body.email,
        password:body.password,
      }
    });

    if(!user){
      c.status(403);
      return c.json({error:"user not found"})
    }
    const jwt=await sign({id:user.id},'secret');
    return c.json({jwt});
  });

export default userRouter;  