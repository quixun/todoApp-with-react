import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [job, setJob] = useState('')
  return (
    <div className="flex items-center justify-center h-screen gap-3">
      <h1>Hello world</h1>
    </div>
  );
}

export default ToDoApp;
