import React, { ChangeEvent } from "react";

interface inputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function InputBox({
  label,
  placeholder,
  onChange,
  type,
}: inputType) {
  return (
    <div>
      <div className="font-bold pt-4">{label}</div>
      <input
        className="mt-2 rounded-lg border-slate-200	border-2 w-96 h-12 p-2 placeholder-black"
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
