import { Link } from "react-router-dom";
import { CalendarDays, Clock, ChevronRight } from "lucide-react";

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

const BlogCard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`} className="block group">
            <article className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="space-y-4">
                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-300 to-zinc-600 flex items-center justify-center text-white font-medium">
                                {authorName[0].toUpperCase()}
                            </div>
                            <span className="font-medium">{authorName}</span>
                        </div>
                        <div className="flex items-center">
                            <CalendarDays className="w-4 h-4 mr-1" />
                            <span>{publishedDate}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                        {title}
                    </h2>

                    {/* Content Preview */}
                    <p className="text-gray-600 line-clamp-2">
                        {content.slice(0, 150)}...
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{Math.ceil(content.length/100)} min read</span>
                        </div>
                        <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                            Read more
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default BlogCard;
