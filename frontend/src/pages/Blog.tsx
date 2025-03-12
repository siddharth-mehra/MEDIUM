
import {useParams} from 'react-router-dom'
import { useBlog } from '@/hooks'
import Individualblog from '@/components/ui/ui/Individualblog'


export const Blog = () => {

  const {id}=useParams<{id:string}>();
  const {loading,blog}=useBlog({id});

  console.log(blog)
  return (
    <div className="">
      {loading===true?
      (
        <div>
          Loading... 
          </div>
      ):(
        
          <Individualblog blog={blog}/>
        
      )

      }
    </div>
  )
}

