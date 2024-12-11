import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
}

const UpdateBlog: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8090/api/collections/blog/records/${id}`
        );
        const fetchedBlog = response.data;

        console.log("Fetched Blog:", fetchedBlog);
        setBlog(fetchedBlog);
        setTitle(fetchedBlog.title);
        setDescription(fetchedBlog.description);
        setImagePreview(fetchedBlog.image);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      console.log("Form Data:", formData);
      const response = await axios.patch(
        `http://127.0.0.1:8090/api/collections/blog/records/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Blog updated successfully:", response.data);
      alert("Your post has been updated.");
      router.push("/posts/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update the blog post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!blog) {
    return <div className="text-center mt-6">Loading blog...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-10 bg-lightblue-100 shadow-sm rounded">
      <h2 className="text-xl font-semibold mb-4">Update Blog Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="block text-sm text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="block text-sm text-gray-700">
            Content
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="block text-sm text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        {imagePreview && (
          <div className="mb-3">
            <p className="text-sm text-gray-500">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Selected Image Preview"
              className="w-full h-48 object-cover mt-2 rounded"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
