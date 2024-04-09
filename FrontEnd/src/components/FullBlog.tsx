import React from "react";
import { Avatar } from "./BlogCard";
import { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const formatDate = (dateString: string) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="font-roboto flex justify-center px-36">
      <div className=" pt-10 max-w-26xl">
        <div className="font-black text-6xl pb-4 max-w-5xl">{blog.title}</div>
        <div className="font-light text-md text-gray-700 pb-5">{`Posted on ${formatDate(
          blog.publishedDate
        )}`}</div>
        <div className="text-xl text-gray-700 max-w-8xl pr-48">
          {blog.content}
        </div>
      </div>
      <div className="flex flex-col w-full pt-12 px-5">
        <div className="font-bold pb-5">Author</div>
        <div className="flex">
          <div className="pt-4 pr-4">
            <Avatar size="big" name={blog.author.name || "Anonymous"} />
          </div>
          <div className="">
            <div className="font-extrabold text-xl">
              {blog.author.name.charAt(0).toUpperCase() +
                blog.author.name.slice(1) || "Anonymous"}
            </div>
            <div className="pt-1">
              Random catch phrase about the author's ability to grab the user's
              attention
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
