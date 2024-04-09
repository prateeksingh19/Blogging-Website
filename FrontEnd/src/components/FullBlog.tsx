import React from "react";
import { Avatar } from "./BlogCard";
import { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <div>
        <div>{blog.title}</div>
        <div>{`Published on ${blog.publishedDate}`}</div>
        <div>{blog.content}</div>
      </div>
      <div>
        <div>Author</div>
        <div>
          <div>
            <Avatar size="small" name={blog.author.name || "Anonymous"} />
          </div>
          <div>
            <div>{blog.author.name || "Anonymous"}</div>
            <div>
              Random catch phrase about the author's ability to grab the user's
              attention
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
