import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import styled from "styled-components";
import { TextInput } from "../components/TextInput";
import { TaskCard } from "../components/TaskCard";
import { Task } from "../types/Task";
import { theme } from "../styles/theme";
import { Button, kind } from "../components/Button";

type FormValues = {
  task: string;
};

export const ToDoApp = () => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("job") || "[]")
  );
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
      <CustomForm onSubmit={handleSubmit(handleAddTask)}>
        <Controller
          control={control}
          name="task"
          rules={{
            required: { value: true, message: "Please enter this field" },
            minLength: {
              value: 2,
              message: "Please enter at least 2 character",
            },
          }}
          render={({
            fieldState: { error },
            field: { onChange, value, ref },
          }) => {
            return (
              <Wrapper>
                <TextInput
                  value={value}
                  error={error}
                  onChange={onChange}
                  placeholder="Enter the thing to do"
                />
                <Button
                  text="ADD"
                  kind={kind.add}
                  onClick={handleSubmit(handleAddTask)}
                />
              </Wrapper>
            );
          }}
        />
        <FormWrapper>
          <Heading1>Things to do</Heading1>
          {!tasks.length && <span>List is empty. Enter a new thing to do</span>}
          {tasks.map((item) => (
            <TaskCard
              key={item.id}
              item={item}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </FormWrapper>
      </CustomForm>
    </Container>
  );
};

const Container = styled.div`
  ${theme.alignment.center}
  background-color: ${theme.color.primary};
  min-height: 100vh;
  padding: 50px 0;
`;
const CustomForm = styled.form`
  ${theme.alignment.center}

  width: 50%;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

const FormWrapper = styled.ul`
  background-color: ${theme.color.secondary};
  width: 80%;
  display: flex-start;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px solid #333;
  border-radius: 10px;
  box-shadow: 5px 10px 0px 5px #333;
  padding: 10px 0;
  position: relative;
`;

const Heading1 = styled.h1`
  ${theme.alignment.center}
  width: 100%;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 3px solid #333;
  padding-bottom: 20px;
  user-select: none;
`;

const Wrapper = styled.div`
  width: 80%;
  position: relative;
  & > input:first-child {
    width: 100%;
    margin-bottom: 10px;
  }

  & > button:last-child {
    position: absolute;
    top: 8px;
    right: 0;
  }
`;
