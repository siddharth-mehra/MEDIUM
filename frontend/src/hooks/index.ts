import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface BlogProp{
    "id":number;
    "title":string;
    "content":string;
    "createdAt":number;
    "author":{
        name:string
    }
}

export const useBlog=({id}:{id:string|undefined})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogProp>();

    useEffect(()=>{
        async function fetchData(){
            try {
                const response=await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                    headers:{
                        Authorization:localStorage.getItem('Authorization')
                    }}
                )
                
                setBlog(response.data);
                setLoading(false)
              } catch (error) {
               console.log(error);
              }
              setLoading(false);
        }
       fetchData();
       
    },[id])

    return {loading,blog,setBlog,setLoading}
}   
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogProp[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token=localStorage.getItem('Authorization');
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                    headers:{
                        Authorization:`${token}`
                    }
                });
                setBlogs(response.data); 
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        loading,
        blogs,
        setBlogs,
        setLoading
    };
};
