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
import { toast } from 'sonner';

const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');

export default function CustomEditor() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateblogInput>({
    title: "",
    content: ""
  });

  const navigate = useNavigate();

  const handleChange = (event: ContentEditableEvent) => {
    setForm(prev => ({
      ...prev,
      title: event.target.value
    }));
  };

  const handleContentChange = (event: ContentEditableEvent) => {
    setForm(prev => ({
      ...prev,
      content: event.target.value
    }));
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      if (!form.title || !form.content) {
        toast.error("Title and content are required");
        return;
      }
      console.log(form);
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create`, form, {
        headers: {
          Authorization: localStorage.getItem('Authorization') || localStorage.getItem('token')
        }
      });
      
      if (response.data) {
        toast.success("Blog published successfully!");
        navigate("/blogs");
      }
    } catch (error) {
      toast.error("Failed to publish blog");
      console.error(error,"error is present");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-10">
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Create Your Story
        </h1>
        
        <EditorProvider>
          <div className="space-y-6">
            <div className="editor-container">
              <Editor 
                value={form.title} 
                onChange={handleChange} 
                className="text-2xl font-bold w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" 
                placeholder="Enter your title here..."
              />
            </div>

            <div className="editor-container">
              <Editor 
                value={form.content} 
                onChange={handleContentChange} 
                className="min-h-[400px] w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white" 
                placeholder="Start writing your story..."
              >
                <Toolbar className="p-2 bg-gray-50 dark:bg-gray-700 rounded-t-lg border border-gray-200 dark:border-gray-600">
                  <BtnBold className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" />
                  <BtnItalic className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" />
                  <BtnAlignCenter className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded" />
                </Toolbar>
              </Editor>
            </div>
          </div>
        </EditorProvider>

        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline"
            onClick={() => navigate('/blogs')}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </div>
    </div>
  );
}
