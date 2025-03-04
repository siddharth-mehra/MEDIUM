import { Hono } from 'hono';
import {PrismaClient} from '@prisma/client/edge';
import {withAccelerate} from '@prisma/extension-accelerate'
import {decode, sign,verify} from 'hono/jwt';


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
  }
}>();



app.use('api/v1/blog/*',async (c,next) => {
  const header=c.req.header('Authorization') || '';
  // Bearer token
  const token=header.split(' ')[1];

  if(!token){
    c.status(401);
    return c.json({error:"unauthorized"});
  }
  const response=await verify(token,'secret');
  if(!response.id){
    c.status(401);
    return c.json({error:"unauthorized"});
  }
  await next();
})

app.get('/',async (c) => {
  return c.text('Hello World');
})

app.post('api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body=await c.req.json();
  console.log(body);
  const user=await prisma.user.create({
    data:{
      email:body.email,
      password:body.password,
      name:body.name,
    }
  })

  const token=await sign({id:user.id},'secret');

  return c.json({jwt:token});
});

app.post('api/v1/signin',async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body=await c.req.json();
  const user=await prisma.user.findUnique({
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

//update
app.put('api/v1/blog',async (c) => {
  return c.text('Hello World');
});

//get blog by id
app.get('api/v1/blog/:id',async (c) => {
  return c.text('Hello World');
});

//create blog
app.post('api/v1/blog',async (c,next) => {
  return c.text('Hello World');
});

//delete blog
app.delete('api/v1/blog/:id',async (c) => {
  return c.text('Hello World');
});

export default app;

