import BlogCard from "@/components/ui/ui/BlogCard";
import { useBlogs } from "@/hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div className="flex justify-center relative pt-10">
      <div className=" flex flex-col justify-center items-center w-full space-y-4 ">
        {loading ? (
          <div>Loading ....</div>
        ) : (
          blogs.map((blog, index) => <BlogCard 
              key={index} // Add a key prop for each blog in the list
              id={blog.id}
              authorName={`${blog.author.name}`}
              publishedDate={`${blog.createdAt}`}
              title={blog.title}
              content={blog.content}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Blogs;
