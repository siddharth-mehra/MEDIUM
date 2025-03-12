import { useState } from 'react';
import { 
  BtnBold, 
  BtnItalic, 
  ContentEditableEvent, 
  createButton, 
  Editor, 
  EditorProvider, 
  Toolbar
} from 'react-simple-wysiwyg';
import { Button } from '../button';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import { CreateblogInput } from '@siddharthmehra/mid11common';
import { useNavigate } from 'react-router-dom';
const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');
   

export default function CustomEditor() {
  const [form, setForm] = useState<CreateblogInput>({
    title:"",
    content:""
  });

  const navigate=useNavigate();
  const handleChange = (event: ContentEditableEvent) => {
    setForm(prev=>({
      ...prev,
      title:event.target.value
    }))
  };

  const handleContentChange=(event:ContentEditableEvent)=>{
    setForm(prev=>({
      ...prev,
      content:event.target.value
    }))
  }

  const handlePublish=async ()=>{
      const response=await axios.post(`${BACKEND_URL}/api/v1/blog/create`,form,{
        headers:{
          Authorization:localStorage.getItem('Authorization')
        }
      })
      if(!response){
        return JSON.stringify(response);
      }
      navigate("/blogs")
  }
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <EditorProvider>
        <Editor value={form.title} onChange={handleChange} className='bg-linear-90 from-gray-500 to-white font-medium text-black' placeholder='Title '>

        </Editor>
        <Editor value={form.content} onChange={handleContentChange} className='bg-linear-90 from-gray-500 to-white font-medium text-black' placeholder='Content'>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnAlignCenter />
          </Toolbar>
        </Editor>
      </EditorProvider>
        <Button className=' bg-indigo-600 mt-2 ' onClick={handlePublish}>
            Publish Post
        </Button>
      
    </div>
  );
}
