import React, { useCallback, useState, useRef } from "react";
import Container from "./components/Container.tsx";
import Input from "./components/Input.tsx";
import Button from "./components/Button.tsx";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [job, setJob] = useState("");

  const focusInput = useRef<HTMLInputElement | null>(null);

  const handleAddTask = useCallback(() => {
    // console.log(`add function is called`);

    if (job !== "") {
      const newTask = {
        id: Math.random(),
        text: job,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setJob("");
      focusInput.current!.focus();
    } else {
      alert("No task added yet");
    }
  }, [job, tasks]);

  const handleDeleteTask = (id: number) => {
    // console.log('delete function is called');
    
    const newTask = tasks.filter((job) => job.id !== id);
    setTasks(newTask);
  };

  const handleCompleteTask = (task) => {
  //  const updateTask = { ...task, completed: !task.completed }; //tasks
    setTasks((prev) => prev.map((item) => {
      if(task.id === item.id) {
        item.completed = true
      }
      return item;
    }))
  }
  return (
    <Container>
      <div className="flex items-center justify-center gap-4">
        <Input focus={focusInput} job={job} setJob={setJob} />
        <Button onClick={handleAddTask} name={`Add Task`} />
      </div>
      <div className="w-auto justify-between flex max-w-full p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl">
        <ul className="flex flex-col gap-2">
          {tasks.map((item, index) => (
            <li
              key={`${item.id}-${index}`} //id-index
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
              <Button
                onClick={() => handleCompleteTask(item)}
                name={item.completed ? `Done` : `Complete`}
              />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default ToDoApp;
