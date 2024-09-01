import React, { useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Container from "../components/Container.tsx";
import { Input } from "../components/Input.tsx";
import { Button } from "../components/Button.tsx";
import { Tasks } from "../components/Tasks.tsx";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type FormValues = {
  task: string;
};

function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("job") || "[]")
  );
  const focusInput = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    getValues,
    reset,
  } = useForm<FormValues>();

  getValues("task");

  const handleAddTask: SubmitHandler<FormValues> = (data) => {
    if (data.task.trim() !== "") {
      const newTask = {
        id: Math.random(),
        text: data.task,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("job", JSON.stringify(updatedTasks));
      reset();
      focusInput.current?.focus();
    } else {
      alert("No task added yet");
    }
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("job", JSON.stringify(updatedTasks));
  };

  const handleCompleteTask = (task: Task) => {
    const updatedTasks = tasks.map((item) =>
      item.id === task.id ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
    localStorage.setItem("job", JSON.stringify(updatedTasks));
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(handleAddTask)}
        className="flex items-center justify-center gap-4"
      >
        <Controller
          control={control}
          name="task"
          rules={{ required: "this field is required", minLength: 2 }}
          render={({
            fieldState: { invalid, error },
            field: { onChange, value },
          }) => {
            return (
              <Input
                focus={focusInput}
                job={value}
                error={error}
                onChange={onChange}
              />
            );
          }}
        ></Controller>
        <Button type="submit" name="Add Task" />
      </form>
      <div className="w-auto justify-between flex max-w-full p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl">
        <ul className="flex flex-col gap-2">
          {tasks.map((item, index) => (
            <Tasks
              key={`${item.id}-${index}`}
              item={item}
              index={index}
              handleCompleteTask={handleCompleteTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default ToDoApp;
