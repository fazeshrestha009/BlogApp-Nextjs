import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface UpdateFormInputs {
  title: string;
  description: string;
  image: FileList | null;
}

const UpdateBlog: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UpdateFormInputs>();
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
        reset({
          title: fetchedBlog.title,
          description: fetchedBlog.description,
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id, reset]);

  const onSubmit = async (data: UpdateFormInputs) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
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
    }
  };

  if (!blog) {
    return <div className="text-center mt-6">Loading blog...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-10 bg-lightblue-100 shadow-sm rounded">
      <h2 className="text-xl font-semibold mb-4">Update Blog Post</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="title" className="block text-sm text-gray-700">
            Title
          </label>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <input
                type="text"
                id="title"
                {...field}
                className="w-full mt-1 p-2 border rounded"
              />
            )}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="block text-sm text-gray-700">
            Content
          </label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <textarea
                id="description"
                {...field}
                className="w-full mt-1 p-2 border rounded"
              />
            )}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="block text-sm text-gray-700">
            Upload Image
          </label>
          <Controller
            name="image"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files)}
                className="w-full mt-1 p-2 border rounded"
              />
            )}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
