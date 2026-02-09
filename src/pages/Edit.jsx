import { MoveLeft, ImageIcon } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateBlogs } from "../api/blogs/blogs.api";
import { useEffect, useState } from "react";
import RichTextEditor from "../components/RichTextEditor";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs } = useAuth();

  const blog = blogs.find((b) => b._id === id);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setVisibility(blog.visibility);
      setPreview(
        blog.image
          ? `${import.meta.env.VITE_API_URL}${blog.image}`
          : null
      );
      setEditorKey((k) => k + 1);
    }
  }, [blog]);

  if (!blog) return <Navigate to="/" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("visibility", visibility);

    // ✅ only append image if user selected new one
    if (image) {
      formData.append("image", image);
    }

    await updateBlogs(formData, id, navigate);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-4 mb-6">
        <Link to="/" className="text-slate-600">
          <MoveLeft />
        </Link>
        <h1 className="text-3xl font-semibold">Edit Blog</h1>
      </div>

      <form
        onSubmit={onSubmit}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* ───── Image Picker ───── */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Blog Image
          </label>

          <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed rounded-xl cursor-pointer hover:bg-slate-50">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover rounded-xl"
              />
            ) : (
              <>
                <ImageIcon className="text-slate-400 mb-2" />
                <span className="text-slate-500 text-sm">
                  Click to upload image
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        {/* ───── Content ───── */}
        <div className="md:col-span-2 space-y-6">
          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xl font-semibold border-b py-2 outline-none"
            placeholder="Blog title"
          />

          {/* Editor */}
          <RichTextEditor
            key={editorKey}
            value={body}
            onChange={setBody}
          />

          {/* Visibility */}
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Actions */}
        <div className="md:col-span-3 flex justify-end gap-4 pt-4 border-t">
          <Link
            to="/"
            className="px-6 py-2 rounded-lg border text-slate-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-2 rounded-lg bg-slate-900 text-white"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;