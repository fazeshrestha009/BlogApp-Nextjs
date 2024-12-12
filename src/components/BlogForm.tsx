import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

interface BlogFormInputs {
  title: string;
  description: string;
  image: FileList | null;
}

const BlogForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<BlogFormInputs>();
  const router=useRouter();

  const onSubmit = async (data: BlogFormInputs) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
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

      alert("Your post created successfully!");
      console.log("Blog created successfully:", response.data);
      reset();
      router.push("/posts/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pb-10 bg-lightblue-100 shadow-sm rounded">
      <h2 className="text-xl font-semibold mb-4">Create a New Blog Post</h2>

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
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="block text-sm text-gray-700">
            Content
          </label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <textarea
                id="description"
                {...field}
                className="w-full mt-1 p-2 border rounded"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
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
          className="w-full bg-green-500 text-white p-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
