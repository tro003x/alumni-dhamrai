import BlogCard from "@/components/modules/Blogs/BlogCard";
import { blogs, Blog } from "@/data/blogs";


const AllBlogsPage = () => {
  return (
    <div className="py-30 px-6 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold mb-12">All Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog: Blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;