import React from "react";
import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <Appbar />
        <Skeleton />
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="font-roboto flex justify-center">
        <div className="">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
