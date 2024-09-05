import React, { useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import Container from "../components/Container";
import { TextInput } from "../components/Input";
import { Button } from "../components/Button";
import { Tasks } from "../components/Tasks";
import { Task } from "../types/task/Task";

type FormValues = {
  task: string;
};

export const ToDoApp = () => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("job") || "[]")
  );
  const InputRef = useRef<HTMLInputElement | null>(null);

  const { control, handleSubmit, setValue } = useForm<FormValues>();

  const saveTaskToLocalStorage = (task: Task[]) => {
    localStorage.setItem("job", JSON.stringify(task));
  };

  const handleAddTask: SubmitHandler<FormValues> = (data) => {
    if (data.task.trim() !== "") {
      const newTask = {
        id: uuid4(),
        text: data.task,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTaskToLocalStorage(updatedTasks);
      setValue("task", "");
      InputRef.current?.focus();
    } else {
      alert("No task added yet");
    }
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTaskToLocalStorage(updatedTasks);
  };

  const handleCompleteTask = (task: Task) => {
    const updatedTasks = tasks.map((item) =>
      item.id === task.id ? { ...item, completed: true } : item
    );
    setTasks(updatedTasks);
    saveTaskToLocalStorage(updatedTasks);
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
          rules={{
            required: { value: true, message: "this field is required" },
            minLength: {
              value: 2,
              message: "this field is at least 2 character",
            },
          }}
          render={({ fieldState: { error }, field: { onChange, value } }) => {
            return (
              <TextInput
                ref={InputRef}
                value={value}
                error={error}
                onChange={onChange}
              />
            );
          }}
        />
        <Button type="submit" text="Add Task" />
      </form>
      <form className="w-auto justify-between flex max-w-full p-6 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl">
        <ul className="flex flex-col gap-2">
          {tasks.map((item) => (
            <Tasks
              key={item.id}
              item={item}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      </form>
    </Container>
  );
}