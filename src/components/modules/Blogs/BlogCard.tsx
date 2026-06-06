import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
}

export default function BlogCard({ id, title, description }: BlogCardProps) {
  const preview =
    description.length > 120 ? description.slice(0, 120) + "..." : description;

  return (
    <Link href={`/blogs/${id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 h-full flex flex-col justify-between border border-gray-100 hover:-translate-y-1 transform transition-transform cursor-pointer">
        <div>
          <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{preview}</p>
        </div>
        <div className="mt-4 text-right">
          <span className="text-blue-600 font-semibold text-sm hover:underline">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}