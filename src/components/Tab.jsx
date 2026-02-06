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
import { Link } from "react-router-dom";
import { deleteBlogs } from "../api/blogs/blogs.api.js";

const Tab = ({ fetch }) => {
  const [myBlogsTab, setMyBlogsTab] = useState(false);
  const { blogs, publicBlogs, loading } = useAuth();

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

          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4xl font-bold text-slate-900"
          >
            All Articles
          </h1>

          <p className="mt-2 text-slate-500 text-sm max-w-xl">
            Find or list tools that help designers build better products.
          </p>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs + Search */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
            <button
              onClick={() => setMyBlogsTab(false)}
              className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition ${
                !myBlogsTab
                  ? "bg-white border border-slate-300 text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Rss size={14} />
              All Blogs
            </button>

            <button
              onClick={() => setMyBlogsTab(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition ${
                myBlogsTab
                  ? "bg-white border border-slate-300 text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <CircleUserRound size={14} />
              My Blogs
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search articles…"
              className="pl-8 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg
              text-slate-800 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-500"
            />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-32 text-slate-400">
            Loading articles…
          </div>
        ) : myBlogsTab ? (
          /* ─── My Blogs (SAME AS PUBLIC UI) ─── */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs?.length ? (
              blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog._id}`}
                  className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden
  hover:shadow-lg transition"
                >
                  {/* Actions */}
                  <div className="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <Link
                      to={`/edit/${blog._id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="p-2 rounded-lg bg-white/90 hover:bg-sky-50 text-slate-500 hover:text-sky-600 shadow">
                        <Edit2 size={14} />
                      </button>
                    </Link>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBlogs(blog._id, fetch);
                      }}
                      className="p-2 rounded-lg bg-white/90 hover:bg-rose-50 text-slate-500 hover:text-rose-600 shadow"
                    >
                      <Trash2Icon size={14} />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        blog.image
                          ? `http://localhost:5000${blog.image}`
                          : "https://source.unsplash.com/600x400/?design,workspace"
                      }
                      alt={blog.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
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

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <CircleUserRound size={12} />
                        Myself
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${
                          blog.visibility === "public"
                            ? "bg-teal-50 text-teal-700 border-teal-200"
                            : "bg-slate-100 text-slate-600 border-slate-300"
                        }`}
                      >
                        {blog.visibility === "public" ? (
                          <Eye size={11} />
                        ) : (
                          <EyeOff size={11} />
                        )}
                        {blog.visibility}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-28 text-center bg-white border border-dashed border-slate-300 rounded-xl">
                <p className="text-slate-500">No blogs yet.</p>
              </div>
            )}
          </div>
        ) : (
          /* ─── Public Blogs ─── */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publicBlogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden
      hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      blog.image
                        ? `http://localhost:5000${blog.image}`
                        : "https://source.unsplash.com/600x400/?design,workspace"
                    }
                    alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
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

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CircleUserRound size={12} />
                      {blog.author?.name}
                    </span>
                    <span>{new Date(blog.createdAt).toDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
