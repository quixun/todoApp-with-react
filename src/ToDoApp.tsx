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
    setJob('')
  };
  return (
    <div className="flex items-center justify-center h-screen gap-3 flex-col">
      <div className="flex items-center justify-center gap-4">
        <input
          className="bg-yellow-200 text-gray-900 focus:outline-lime-600"
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <button
          className="bg-yellow-200 text-gray-900 border-solid border w-20 border-[#333] rounded-md"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default ToDoApp;
