import {
  CircleUserRound,
  Edit2,
  Eye,
  EyeOff,
  Rss,
  Search,
  Trash2Icon,
} from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteBlogs } from "../api/blogs/blogs.api.js";

const Tab = ({ fetch }) => {
  const [myBlogsTab, setMyBlogsTab] = useState(false);
  const { blogs, publicBlogs, loading } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ─── Header ─── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-10">
          <div className="flex items-center gap-2 mb-4">
            <Rss size={16} className="text-sky-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Articles
            </span>
          </div>

          <h1 className="text-4xl font-bold text-slate-900">
            All Articles
          </h1>

          <p className="mt-2 text-slate-500 text-sm max-w-xl">
            Find or list tools that help designers build better products.
          </p>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200 mb-8">
          <button
            onClick={() => setMyBlogsTab(false)}
            className={`px-5 py-2 rounded-md text-sm font-medium ${
              !myBlogsTab
                ? "bg-white border border-slate-300 shadow-sm"
                : "text-slate-500"
            }`}
          >
            All Blogs
          </button>

          <button
            onClick={() => setMyBlogsTab(true)}
            className={`px-5 py-2 rounded-md text-sm font-medium ${
              myBlogsTab
                ? "bg-white border border-slate-300 shadow-sm"
                : "text-slate-500"
            }`}
          >
            My Blogs
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-32 text-center text-slate-400">
            Loading articles…
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(myBlogsTab ? blogs : publicBlogs).map((blog) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden
                hover:shadow-lg transition cursor-pointer"
              >
                {/* Actions (only My Blogs) */}
                {myBlogsTab && (
                  <div className="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit/${blog._id}`);
                      }}
                      className="p-2 bg-white/90 rounded-lg shadow hover:text-sky-600"
                    >
                      <Edit2 size={14} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBlogs(blog._id, fetch);
                      }}
                      className="p-2 bg-white/90 rounded-lg shadow hover:text-rose-600"
                    >
                      <Trash2Icon size={14} />
                    </button>
                  </div>
                )}

                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      blog.image
                        ? `${API_URL}${blog.image}`
                        : "https://source.unsplash.com/600x400/?design,workspace"
                    }
                    alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-slate-900 mb-2">
                    {blog.title}
                  </h2>

                  <div
                    className="prose prose-sm text-slate-600 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: blog.body }}
                  />

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-3">
                    <span className="flex items-center gap-1">
                      <CircleUserRound size={12} />
                      {myBlogsTab ? "Myself" : blog.author?.name}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full border ${
                        blog.visibility === "public"
                          ? "bg-teal-50 text-teal-700 border-teal-200"
                          : "bg-slate-100 text-slate-600 border-slate-300"
                      }`}
                    >
                      {blog.visibility === "public" ? <Eye size={11} /> : <EyeOff size={11} />}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;