import {Context,Next} from 'hono';
import {verify} from 'hono/jwt';

type JWTPayload = {
  id: string;
}
async function blogmiddleware(c:Context<
  {
    Bindings:{
      DATABASE_URL:string
    },
    Variables:{
      userId:string
    }
  }>,
  next:Next){

  const token=c.req.header('authorization') || '';
  console.log("Token:",token);
  if(!token){
    c.status(403);
    return c.json({error:"token not found"});
  }
  try{
    const response=await verify(token,'secret') as JWTPayload;
    console.log(response)
    if(!response.id){
      c.status(403);
      return c.json({error:"invalid token"});
    }
    c.set('userId',response.id);
    await next();
  }catch(error){
    c.status(403);
    return c.json({error:"invalid token"});
  }
}

export default blogmiddleware;