import { ChangeEvent,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { SignUpInput } from '@siddharthmehra/mid11common';
import { Button } from '../button';
import axios from "axios";
import { BACKEND_URL } from '@/config';


const Auth = ({type}:{type:"Signup" | "Signin"}) => {
  
  const navigate=useNavigate(); 
  const [postInputs,setPostInputs]=useState<SignUpInput>({
        name:"",
        email:"",
        password:""
    }); 

    async function sendRequest() {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/${type === "Signup" ? "signup" : "signin"}`,
          postInputs
        );
        
        // Assuming the JWT is in response.data.token
        const jwt = response.data.token?.jwt || response.data.jwt;
        console.log(response.data.token?.jwt)
        console.log(response.data.jwt)
        if (jwt) {
          localStorage.setItem("Authorization", `${jwt}`);
          navigate("/blogs");
        } else {
          console.error("No token received");
        }
      } catch (e) {
        console.error("Auth error:", e);
        // Add error handling here - maybe show a toast message
      }
    }

    return (
    <div className='flex flex-col p-8 shadow-xl bg-zinc-300 border-1 border-white rounded-lg max-w-[500px]'>
      <h2 className='text-3xl font-extrabold'>
        Create an Account
      </h2>
      <p className='text-center text-slate-400'>
        {type==="Signin"?"Don't have an account?":"Already have an account?"}
        <Link to={type==="Signup"?"/Signin":"/Signup"} className='underline'>
          {type==="Signup"?"Login":"Signup"}
        </Link>
      </p>
      <div className='pt-3 space-y-5'>
        { type==='Signup'?(<LabelInput label="Name"  placeholder="Siddharth..." onChange={(e)=>{
            setPostInputs(c=>({...c,name:e.target.value}))
        }}/>):(null)}
        <LabelInput label="Email"  placeholder="siddj@gmail.com" onChange={(e)=>{
            setPostInputs(c=>({...c,email:e.target.value}))
        }}/>
        <LabelInput label="Password" type={`password`} placeholder="*******" onChange={(e)=>{
            setPostInputs(c=>({...c,password:e.target.value}))
        }}/>
      </div>
      <div className='pt-5 '>
        <Button className='w-full py-5 bg-gray-600 text-white' onClick={sendRequest} >
            {type}            
        </Button>
      </div>
    </div>
  )
}

interface LabelInputtype{
    label:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}

function LabelInput({label,placeholder,onChange,type}:LabelInputtype){
    return <div>
            <label htmlFor={`${label}`} className="block mb-2 text-sm font-extrabold text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type || "text"} id={`${label}`} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg
             bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}/>
        </div>
}

export default Auth
