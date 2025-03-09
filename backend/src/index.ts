import { Hono } from 'hono';

import blogRouter from './routes/blog';
import userRouter from './routes/user';
import blogmiddleware from './middleware';

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
  }
}>();

app.use('api/v1/blog/*', blogmiddleware);
app.route('api/v1/user', userRouter);
app.route('api/v1/blog', blogRouter);

export default app;


