import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../api/blogs/blogs.api";
import { CircleUserRound } from "lucide-react";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getSingleBlog(id, setBlog, setLoading);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found
      </div>
    );
  }

  return (
    <div className="bg-stone-50">
      {/* ───────── HERO ───────── */}
      <section className="bg-amber-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {blog.image && (
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={`${API_URL}${blog.image}`}
                alt={blog.title}
                className="w-full h-[420px] object-cover"
              />
            </div>
          )}

          <div>
            <span className="inline-block bg-amber-200 text-amber-900 px-4 py-1 rounded-full text-sm mb-4">
              hello 👋
            </span>

            <h1
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {blog.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CircleUserRound size={16} />
              <span>{blog.author?.name || "Unknown"}</span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── CONTENT ───────── */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <article
            className="
              prose prose-lg prose-slate max-w-none
              [&_p]:mb-6
              [&_h2]:mt-10 [&_h2]:mb-4
              [&_ul]:my-6 [&_ul]:pl-6
              [&_li]:mb-2
            "
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />
        </div>
      </section>
    </div>
  );
};

export default SingleBlog;