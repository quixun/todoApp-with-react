import React, { useCallback, useState, useRef } from "react";
import Container from "./components/Container.tsx";
import Input from "./components/Input.tsx";
import Button from "./components/Button.tsx";
import Tasks from "./components/Tasks.tsx";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("job") || "[]")
  );
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
      const jsonJob = JSON.stringify([...tasks, newTask]);
      localStorage.setItem("job", jsonJob);
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
    const jsonJob = JSON.stringify(newTask);
    localStorage.setItem("job", jsonJob);
  };

  const handleCompleteTask = (task) => {
    //  const updateTask = { ...task, completed: !task.completed }; //tasks
    setTasks((prev) => {
      const updatedTasks = prev.map((item) => {
        if (task.id === item.id) {
          return { ...item, completed: true };
        }
        return item;
      });

      const jsonJob = JSON.stringify(updatedTasks);
      localStorage.setItem("job", jsonJob);

      return updatedTasks;
    });
  };

  return (
    <Container>
      <div className="flex items-center justify-center gap-4">
        <Input focus={focusInput} job={job} setJob={setJob} />
        <Button onClick={handleAddTask} name={`Add Task`} />
      </div>
      <div className="w-auto justify-between flex max-w-full p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl">
        <ul className="flex flex-col gap-2">
          {tasks.map((item, index) => (
            <Tasks item={item} index={index} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask}/>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default ToDoApp;
