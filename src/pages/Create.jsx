import { MoveLeft, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createBlogs } from "../api/blogs/blogs.api";
import { useState } from "react";
import RichTextEditor from "../components/RichTextEditor";

const Create = () => {
  const { handleSubmit, register, reset } = useForm();
  const [body, setBody] = useState("");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const { onChange: imageOnChange, ...imageRegister } = register("image");

  const onSubmit = async (data) => {
    if (!body || body === "<p></p>") {
      alert("Please write some content");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", body);
    formData.append("visibility", data.visibility);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    await createBlogs(formData, navigate);
    reset();
    setBody("");
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-4 mb-6">
        <Link to="/" className="text-slate-600">
          <MoveLeft />
        </Link>
        <h1 className="text-3xl font-semibold">Create Blog</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Image */}
        <div>
          <label className="text-sm font-medium text-slate-600 mb-2 block">
            Blog Image
          </label>

          <label className="h-56 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer">
            {preview ? (
              <img
                src={preview}
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <>
                <ImageIcon className="text-slate-400" />
                <span className="text-slate-500 text-sm">Upload image</span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...imageRegister}
              onChange={(e) => {
                imageOnChange(e);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </label>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
          <input
            {...register("title")}
            placeholder="Blog title"
            className="w-full text-xl font-semibold border-b py-2 outline-none"
          />

          <RichTextEditor value={body} onChange={setBody} />

          <select
            {...register("visibility")}
            defaultValue="public"
            className="border px-4 py-2 rounded-lg"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="md:col-span-3 flex justify-end gap-4 pt-6 border-t">
          <Link to="/" className="px-6 py-2 border rounded-lg">
            Cancel
          </Link>
          <button className="px-8 py-2 bg-slate-900 text-white rounded-lg">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;