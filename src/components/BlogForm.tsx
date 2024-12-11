import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const Blogform: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const response = await axios.post(
        "http://127.0.0.1:8090/api/collections/blog/records",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Blog created successfully:", response.data);
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pb-10 bg-lightblue-100 shadow-sm rounded">
      <h2 className="text-xl font-semibold mb-4">Create a New Blog Post</h2>

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
          <label htmlFor="content" className="block text-sm text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={description}
            onChange={(e) => setContent(e.target.value)}
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
        <Link href="/posts/blogs">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Blogform;
