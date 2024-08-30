import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

// Define the type for form values
type InputProps<T extends FieldValues> = {
  job: string;
  setJob: (value: string) => void;
  focus: React.RefObject<HTMLInputElement>;
  register: UseFormRegister<T>;
  error: FieldErrors<T>;
};

export const Input = <T extends FieldValues>({
  job,
  setJob,
  focus,
  register,
  error,
}: InputProps<T>) => {
  const taskPath: Path<T> = "task" as Path<T>;
  const errorMessage = error.task?.message as string | undefined;

  return (
    <>
      <input
        {...register(taskPath, {
          required: "This field is required",
          minLength: {
            value: 2,
            message: "Task must be at least 2 characters long",
          },
        })}
        className="bg-yellow-200 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-lime-600 transition-all duration-300 ease-in-out"
        type="text"
        placeholder="Enter a task"
        value={job}
        ref={focus}
        onChange={(e) => setJob(e.target.value.trim())}
      />
      {error.task && <span>{errorMessage}</span>}
    </>
  );
};
