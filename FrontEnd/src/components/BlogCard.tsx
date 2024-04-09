import React from "react";
import { Link } from "react-router-dom";

export interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <Link to={`/blog/${id}`}>
      <div className="font-roboto border-b-2 pb-6 pt-6 pl-10 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div className="flex flex-col justify-center">
            <Avatar size={"small"} name={authorName} />
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center pl-2 font-medium text-lg">
              {authorName.charAt(0).toUpperCase() + authorName.slice(1)}{" "}
            </div>
            <div className="flex flex-col justify-center text-lg text-grey-300 pl-1">
              &#128900;
            </div>
            <div className="flex flex-col justify-center pl-1 text-md font-light">
              {formatDate(publishedDate)}
            </div>
          </div>
        </div>
        <div className="font-bold text-2xl pt-4">{title}</div>
        <div className="text-xl pt-2">{content.slice(0, 85) + "..."}</div>
        <div className="text-slate-500 pt-6">{`${Math.ceil(
          content.length / 100
        )} minute read`}</div>
      </div>
    </Link>
  );
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-7 h-7" : "w-10 h-10"
      }`}
    >
      <span
        className={`font-medium ${
          size === "small" ? "text-sm" : "text-lg"
        } text-gray-600 dark:text-gray-300`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
