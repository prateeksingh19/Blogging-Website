import React from "react";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export function Appbar() {
  return (
    <div className="border-b flex justify-between px-10 py-5">
      <Link to={"/blogs"}>
        <div className="font-bold flex flex-col justify-center text-xl cursor-pointer">
          Medium
        </div>
      </Link>
      <div>
        <Avatar size={"big"} name={"Prateek"} />
      </div>
    </div>
  );
}
