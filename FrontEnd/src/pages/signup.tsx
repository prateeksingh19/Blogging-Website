import Auth from "../components/Auth";
import Quote from "../components/Quote";
import React from "react";

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen flex flex-col justify-center ">
        <div className="flex justify-center">
          <Auth type={"signup"} />
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
