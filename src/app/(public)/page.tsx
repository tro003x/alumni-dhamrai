import Hero from "@/components/modules/Home/Hero";
import BlogCard from "@/components/modules/Blogs/BlogCard";
import { blogs } from "@/data/blogs";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-12">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              description={blog.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}