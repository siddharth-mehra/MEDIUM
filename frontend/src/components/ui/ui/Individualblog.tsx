import { BlogProp } from '@/hooks'
import { formatDate } from '@/lib/utils' // You'll need to create this utility
import { CalendarDays, Clock, User } from 'lucide-react'
import { Link } from "react-router-dom";
import { Edit } from "lucide-react"; // Import the edit icon

interface IndividualBlogProps {
    blog: BlogProp | undefined
}

const Individualblog = ({ blog }: IndividualBlogProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-300 to-zinc-600 bg-opacity-10 py-10 px-4">
            <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8'>
                {/* Main Content */}
                <article className="lg:col-span-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6">
                    <header className="space-y-4 border-b border-gray-200 pb-6">
                        <div className="flex justify-between items-start">
                            <h1 className='font-extrabold text-3xl text-gray-800'>{blog?.title}</h1>
                            
                        </div>
                        <div className="flex items-center space-x-4 text-gray-600">
                            <div className="flex items-center">
                                <CalendarDays className="w-4 h-4 mr-2" />
                                <time>{formatDate(blog?.createdAt)}</time>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                            </div>
                        </div>
                        <Link 
                                to={`/edit/${blog?.id}`}
                                className="flex items-center gap-2 w-[200px] px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                                <span>Edit Post</span>
                            </Link>

                    </header>

                    <div className="prose prose-lg max-w-none">
                        <p className='leading-relaxed text-gray-700'>{blog?.content}</p>
                    </div>
                </article>

                {/* Author Sidebar */}
                <aside className='lg:col-span-4 space-y-6'>
                    <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6'>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className='text-xl font-semibold text-gray-800'>{blog?.author.name}</h2>
                                <p className='text-sm text-gray-600'>Author</p>
                            </div>
                        </div>
                        <p className='text-sm text-gray-600 leading-relaxed'>
                            Master of earth, Purveyor of puns, and the funniest person in the kingdom
                        </p>
                    </div>

                    {/* You can add more sidebar components here */}
                    <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6'>
                        <h3 className="text-lg font-semibold mb-4">More from this author</h3>
                        {/* Add more blog posts by the same author here */}
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Individualblog
