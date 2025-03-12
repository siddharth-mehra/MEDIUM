import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate"; 
import { createblogInput,updateblogInput } from "@siddharthmehra/mid11common";
const blogRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string;
    },
    Variables:{
      userId:string;
    }
  }>();  
 
//   pagination
blogRouter.get('/bulk',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const authorId=c.get('userId');
  try {
      const posts=await prisma.post.findMany({
          where:{
              authorId:authorId,
          },
          select:{
            title:true,
            id:true,
            content:true,
            createdAt:true,
            author:{
              select:{
                name:true
              }
            }
          }
      });
      return c.json(posts);
  } catch (error) {
      c.status(403);
      return c.json({error:"posts not found"});
  }
})
 
  //update
blogRouter.put('/',async (c) => {
  const updateBody = updateblogInput.parse(await c.req.json());
    
    if (!updateBody) {
      return c.json({ message: 'No update body provided' }, 400);
    }
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const authorId=c.get('userId');

    console.log(body);
    try {
        const post=await prisma.post.update({
            where:{
                id:body.id,
                authorId:authorId,
            },
            data:{
                title:body.title,
                content:body.content,
            }
        });

        return c.json({status:"success",post});
    } catch (error) {
        c.status(403);
        return c.json({error:"post not found for updation"});
    }
  });
  
  //get blog by id
blogRouter.get('/:id',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const postId=c.req.param('id');
        const post=await prisma.post.findFirst({
            where:{
                authorId:c.get('userId'),
                id:postId,
            },
            select:{
              title:true,
              content:true,
              createdAt:true,
              author:{
                select:{
                  name:true
                }
              }
            }
        });
        return c.json(post);
    } catch (error) {
        c.status(403);
        return c.json({error:"post not found"});
    }
  });
  
  //create blog
blogRouter.post('/create',async (c) => {
  const body=await c.req.json();
  const {success}=createblogInput.safeParse(body);
    if(!success){
      c.status(403);
      return c.json({error:"invalid input"});
    }
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const userId=c.get('userId');
        const body=await c.req.json();
        
        const post=await prisma.post.create({
          data:{
            title:body.title,
            content:body.content,
            published:true,
            authorId:userId,
          }
        })
        
        return c.json(post);
    } catch (error) {
        c.status(403);
        return c.json({error:"post not created"});
    }
  });
  
  //delete blog
blogRouter.delete('/:id',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
        const userId=c.get('userId');
        const postId=c.req.query('id');
        const post=await prisma.post.findFirst({
          where:{
            id:postId,
            authorId:userId,
          }
        });
        return c.json({message:"post deleted"});
    } catch (error) {
        c.status(403);
        return c.json({error:"post not found"});
    }
  });



export default blogRouter;  