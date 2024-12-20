import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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
  const router = useRouter();

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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8090/api/collections/blog/records/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      alert("Your post is deleted.");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  const handleUpdate = async (id: string) => {
    router.push(`/updateBlog/${id}`);
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded p-4 hover:bg-gray-100 hover:scale-105 transform transition-all duration-200 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            {blog.image && (
              <img
                src={`http://127.0.0.1:8090/api/files/blog/${blog.id}/${blog.image}`}
                alt={blog.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <p className="text-gray-700">{blog.description}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleUpdate(blog.id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
