import React, { ChangeEventHandler } from "react";
import { FieldError } from "react-hook-form";


type InputProps = {
  job: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  focus: React.RefObject<HTMLInputElement>;
  error?: FieldError;
};

export const TextInput = ({ job, onChange, focus, error }: InputProps) => {
  return (
    <>
      <input
        className="bg-yellow-200 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-lime-600 transition-all duration-300 ease-in-out"
        type="text"
        placeholder="Enter a task"
        value={job}
        ref={focus}
        onChange={onChange}
      />
      {error && <span>{error.message}</span>}
    </>
  );
};
