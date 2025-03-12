import { Link } from "react-router-dom";


interface BlogCardProps{
    id:number;
    authorName:string;
    title:string;
    content:string;
    publishedDate:string
}
const BlogCard = ({id,authorName,title,content,publishedDate}:BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className=" border border-slate-500 p-5 rounded-2xl mt-2 w-full min-w-[400px] min-w-[600px] bg-linear-120 from-indigo-400 to white">
      <div className='flex'>
        <p className="font-extralight mr-1.5">{authorName},</p>{publishedDate}
      </div>
      <h2 className="text-3xl font-extrabold">
        {title}
      </h2>
      <div className='mb-2 text-md font-thin'>
        {content.slice(0,100)+"..."}
      </div>
      <div className='text-slate-500 text-sm font-thin'>
        {`${Math.ceil(content.length/100)} minutes`}
      </div>
      <div className='bg-slate-200 h-0.5 w-1/3 mt-2'>
      </div>  
    </div>
    </Link>
    
  )
}

export default BlogCard
