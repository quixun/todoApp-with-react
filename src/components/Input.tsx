import React, { memo } from "react";

function Input({ job, setJob }) {
  return (
    <input
      className="bg-yellow-200 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-lime-600 transition-all duration-300 ease-in-out"
      type="text"
      placeholder="Enter a task"
      value={job}
      onChange={(e) => setJob(e.target.value)}
    />
  );
}

export default memo(Input);
