import React, { useCallback, useState } from "react";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid"; 
import Container from "./components/Container.tsx";
import TextInput from "./components/Input.tsx";
import Button from "./components/Button.tsx";

type Task = {
  id: UUID;
  text: string;
  completed: boolean;
}

function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [job, setJob] = useState("");

  const handleAddTask = useCallback(() => {
    // console.log(`function is called`);

    if (job !== "") {
      const newTask = {
        id: uuidv4(),
        text: job,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setJob("");
    }
  }, [job]);

  const handleDeleteTask = (id: string) => {
    const updateTasks = tasks.filter((job) => job.id !== id);
    setTasks(updateTasks);
  };

  return (
    <Container>
      <div className="flex items-center justify-center gap-4">
        <TextInput job={job} setJob={setJob} />
        <Button onClick={handleAddTask} name={`Add Task`} />
      </div>
      <div className="w-auto justify-between flex max-w-full p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl">
        <ul className="flex flex-col gap-2">
          {tasks.map((item, index) => (
            <li
              key={index}
              className="flex flex-row items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="font-bold text-gray-700">ID:</div>
              <div className="text-gray-500">{item.id}</div>
              <div className="font-bold text-gray-700">Task:</div>
              <div className="text-gray-500">{item.text}</div>
              <Button
                onClick={() => handleDeleteTask(item.id)}
                name={`Remove`}
              />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default ToDoApp;
