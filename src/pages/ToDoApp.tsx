import React, { useState, useRef } from "react";
import { useForm, SubmitHandler, Controller ,Form} from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import styled from "styled-components";
import { TextInput } from "../components/TextInput";
import { TaskCard } from "../components/TaskCard";
import { Task } from "../types/task/Task";

type FormValues = {
  task: string;
};

export const ToDoApp = () => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("job") || "[]")
  );
  const inputRef = useRef<HTMLInputElement>(null);

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
      inputRef.current?.focus();

      console.log("r")
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

  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #68d391;
  `;
  const CustomForm = styled.form`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  `;

  const UlCustom = styled.ul`
    width: 52%;
    display: flex-start;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #FFF59D;
    border: 3px solid #333; 
    border-radius: 10px;
    box-shadow: 5px 10px 0px 5px #333;
    padding: 10px 0;
    position: relative;

    h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 3px solid #333;
    padding-bottom: 20px;
  }
    span {
    margin-left: 20px;
    font-size: 20px;
    }
  
  `
  return (
    <Container>
      <CustomForm onSubmit={handleSubmit(handleAddTask)}>
        <Controller
          control={control}
          name="task"
          rules={{
            required: { value: true, message: "please enter this field" },
            minLength: {
              value: 2,
              message: "please enter at least 2 character",
            },
          }}
          render={({ fieldState: { error }, field: { onChange, value } }) => {
            return (
              <TextInput
                ref={inputRef}
                value={value}
                error={error}
                onChange={onChange}
                placeholder="Enter the thing to do"
              />
            );
          }}
        />
        <UlCustom>
          <h1>Things to do</h1>
         {!tasks.length && <span>List is empty. Enter a new thing to do</span>}
          {tasks.map((item) => (
            <TaskCard
              key={item.id}
              item={item}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </UlCustom>
      </CustomForm>
    </Container>
  );
};
