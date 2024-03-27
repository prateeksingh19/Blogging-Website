import React from "react";
import { Link } from "react-router-dom";

export default function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="flex pt-2 text-lg mb-4">
      <div className="">{label}</div>
      <Link
        className="pointer underline underline-offset-3 pl-1 cursor-pointer pt-0.5"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
