import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [job, setJob] = useState("");

  const handleAddTask = () => {
    const newTask = {
      id: Math.random(),
      text: job,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setJob("");
  };
  return (
    <div className="flex items-center justify-center h-screen gap-6 flex-col bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="flex items-center justify-center gap-4">
        <input
          className="bg-yellow-200 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-lime-600 transition-all duration-300 ease-in-out"
          type="text"
          placeholder="Enter a task"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <button
          className="bg-yellow-200 text-gray-900 border border-solid w-24 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-900 hover:text-yellow-200 hover:bg-gray-900 hover:border-yellow-200"
          onClick={() => handleAddTask()}
        >
          Add Task
        </button>
      </div>
      <div className="w-11/12 max-w-md p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl">
        <ul className="flex flex-col gap-4">
          {tasks.map((item, index) => (
            <li
              key={index}
              className="flex flex-row items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="font-bold text-gray-700">ID:</div>
              <div className="text-gray-500">{item.id}</div>
              <div className="font-bold text-gray-700">Task:</div>
              <div className="text-gray-500">{item.text}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoApp;
