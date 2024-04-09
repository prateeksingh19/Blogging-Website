import React from "react";
import { Avatar } from "./BlogCard";

export function Appbar() {
  return (
    <div className="border-b flex justify-between px-10 py-5">
      <div className="font-bold flex flex-col justify-center text-xl cursor-pointer">
        Medium
      </div>
      <div>
        <Avatar size={"big"} name={"Prateek"} />
      </div>
    </div>
  );
}
