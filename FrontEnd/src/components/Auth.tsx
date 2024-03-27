import React, { useState } from "react";
import Heading from "./Heading";
import BottomWarning from "./BottomWarning";
import InputBox from "./InputBox";
import { Button } from "./Button";
import { SignupInput } from "@prateek19/blogging-website-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        inputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      console.log(jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error: " + e.message);
    }
  }
  return (
    <div>
      <div>
        <div className="flex justify-around">
          <Heading
            label={
              type === "signin" ? "Login to your account" : "Create an account"
            }
          />
        </div>
        <div className="flex justify-around">
          <BottomWarning
            label={
              type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"
            }
            buttonText={type === "signin" ? "Register" : "Login"}
            to={type === "signin" ? "/signup" : "/signin"}
          />
        </div>
      </div>
      <div>
        {type === "signup" && (
          <InputBox
            label={"Name"}
            placeholder={"Enter your name"}
            onChange={(e) => {
              setInputs((c) => ({
                ...c,
                name: e.target.value,
              }));
            }}
          />
        )}
        <InputBox
          label={"Email"}
          placeholder={"me@example.com"}
          onChange={(e) => {
            setInputs((c) => ({
              ...c,
              email: e.target.value,
            }));
          }}
        />
        <InputBox
          label={"Password"}
          type={"password"}
          placeholder={""}
          onChange={(e) => {
            setInputs((c) => ({
              ...c,
              password: e.target.value,
            }));
          }}
        />
      </div>
      <Button
        label={type === "signin" ? "Sign In" : "Sign Up"}
        onClick={sendRequest}
      />
    </div>
  );
}
