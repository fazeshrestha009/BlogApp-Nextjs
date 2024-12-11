import React, { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string; 
}

const BlogPosts: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8090/api/collections/blog/records"
        );
        setBlogs(response.data.items); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            {blog.image && (
              <img
                src={`http://127.0.0.1:8090/api/files/blog/${blog.id}/${blog.image}`}
                alt={blog.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <p className="text-gray-700">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
