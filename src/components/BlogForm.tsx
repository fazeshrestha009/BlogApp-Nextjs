import { useState } from "react";

const BlogForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Image:", image);
    // Add further logic for form submission (e.g., upload the image)
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-lightblue-100 shadow-sm rounded">
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
            value={content}
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

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
