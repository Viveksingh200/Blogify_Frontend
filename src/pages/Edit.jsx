import { MoveLeft } from "lucide-react";
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
  const [body, setBody] = useState("");
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (blog) {
      setBody(blog.body);
      setEditorKey((k) => k + 1); // 🔥 force TipTap reload
    }
  }, [blog]);

  if (!blog) return <Navigate to="/" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateBlogs(
      { title: blog.title, body, visibility: blog.visibility },
      id,
      navigate
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-4 mb-6">
        <Link to="/" className="text-slate-600">
          <MoveLeft />
        </Link>
        <h1 className="text-3xl font-semibold">Edit Blog</h1>
      </div>

      <form
        onSubmit={onSubmit}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <input
          defaultValue={blog.title}
          className="w-full text-xl font-semibold border-b py-2 outline-none"
        />

        <RichTextEditor
          key={editorKey}
          value={body}
          onChange={setBody}
        />

        <button className="px-8 py-2 bg-slate-900 text-white rounded-lg">
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;