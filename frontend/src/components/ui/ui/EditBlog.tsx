import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import { Editor, EditorProvider, Toolbar } from 'react-simple-wysiwyg';
import { BtnBold, BtnItalic, ContentEditableEvent } from 'react-simple-wysiwyg';

interface BlogPost {
    id: string;
    title: string;
    content: string;
    authorId: string;
}

export const EditBlog = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<BlogPost>({
        id: '',
        title: '',
        content: '',
        authorId: ''
    });

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) return;
            
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        'Authorization': localStorage.getItem('Authorization')
                    }
                });
                
                if (response.data.blog) {
                    setBlog({
                        id: response.data.blog.id,
                        title: response.data.blog.title,
                        content: response.data.blog.content,
                        authorId: response.data.blog.authorId
                    });
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                navigate('/blogs');
            }
        };

        fetchBlog();
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`${BACKEND_URL}/api/v1/blog`, {
                id: id,
                title: blog.title,
                content: blog.content
            }, {
                headers: {
                    'Authorization': localStorage.getItem('Authorization')
                }
            });
            navigate(`/blog/${id}`);
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const handleContentChange = (e: ContentEditableEvent) => {
        setBlog(prev => ({
            ...prev,
            content: e.target.value
        }));
    };

    if (!blog.title) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                    <input
                        type="text"
                        value={blog.title}
                        onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full text-4xl font-bold border-none outline-none mb-8 bg-transparent"
                        placeholder="Blog Title"
                    />
                    
                    <EditorProvider>
                        <Editor 
                            value={blog.content} 
                            onChange={handleContentChange}
                            className="min-h-[500px] prose max-w-none"
                        >
                            <Toolbar>
                                <BtnBold />
                                <BtnItalic />
                            </Toolbar>
                        </Editor>
                    </EditorProvider>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(`/blog/${id}`)}
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update Post
                    </button>
                </div>
            </form>
        </div>
    );
};