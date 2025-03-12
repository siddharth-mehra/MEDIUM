
import { BlogProp } from '@/hooks'

interface IndividualBlogProps{
    blog:BlogProp|undefined
}
const Individualblog = ({blog}:IndividualBlogProps) => {
    
  return (
    <div className='grid grid-cols-12 pt-10'>
      <div className="grid col-span-8 bg-gray-200 p-10 space-y-2">
        <h1 className='font-extrabold text-3xl'>{blog?.title}</h1>
        <p>{`Posted on ${blog?.createdAt}`}</p>
        <p className='font-extralight'>{blog?.content}</p>
      </div>
      <div className='grid bg-amber-200 col-span-4 p-4 '>
        <h1 className='text-3xl font-semibold '>{blog?.author.name}</h1>
        <p className='text-xm text-zinc-600'>Master of earth,Purvyer of puns,and the
            funniest person in the kingdom </p>
      </div>
    </div>
  )
}

export default Individualblog
