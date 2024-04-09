import React from "react";
import { useBlog } from "../hooks";
import { Skeleton } from "../components/Skeleton";
import { FullBlog } from "../components/FullBlog";
import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading || !blog) {
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
      <FullBlog blog={blog} />
    </div>
  );
};
