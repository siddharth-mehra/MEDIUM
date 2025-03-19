import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, TrendingUp } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const Homepage: React.FC = () => {
  // Mock data - replace with actual API calls
  const featuredPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting Started with TypeScript',
      excerpt: `Learn the basics of TypeScript and why it's becoming the standard...`,
      author: 'John Doe',
      date: 'Mar 19, 2024',
      readTime: '5 min read',
      category: 'Programming'
    },
    // Add more featured posts
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-zinc-900 via-zinc-600 to-zinc-200">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Where good ideas find you
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Read and share ideas from independent voices, world-class publications, and experts from around the globe.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-3 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Reading
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <TrendingUp className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold">Trending on Medium</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/signup`}
                className="group"
              >
                <article className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`}
                      alt={post.author}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.date} · {post.readTime}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-indigo-600 font-medium">
                      {post.category}
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Discover more of what matters to you</h2>
          <div className="flex flex-wrap gap-4">
            {['Programming', 'Data Science', 'Technology', 'Writing', 'Relationships', 'Machine Learning'].map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="px-6 py-2 rounded-full text-black bg-white border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
