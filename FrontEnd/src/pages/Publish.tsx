import React, { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-6">
        <div className="pr-5 pt-3 flex justify-center">
          <div className="border-r-2 h-1/4 pb-1 flex flex-col justify-center">
            <button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog/add`,
                  { title, content },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              className="rounded-full border-solid border border-gray-900 w-12 text-4xl h-12 pb-2 mr-4 ml-4 text-gray-900 font-light"
            >
              +
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <textarea
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="block p-5 mb-4 w-full h-24 text-5xl font-light text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            placeholder="Title"
          ></textarea>

          <textarea
            id="content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="block p-5 w-full text-2xl h-60 text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            placeholder="Tell your story..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};
