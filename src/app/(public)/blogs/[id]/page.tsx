
import { blogs, Blog } from "@/data/blogs";
import { notFound } from "next/navigation";

export default function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = blogs.find((b: Blog) => b.id === params.id);

  if (!blog) return notFound();

  return (
    <div className="py-30 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <p className="text-gray-700 text-lg leading-relaxed">{blog.description}</p>
    </div>
  );
}