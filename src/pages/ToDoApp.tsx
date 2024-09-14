import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import styled from "styled-components";
import { TextInput } from "../components/task/TextInput";
import { TaskItem } from "../components/task/TaskItem";
import { Task } from "../types/Task";
import { theme } from "../styles/theme";
import { Button, kind } from "../components/common/Button";
import { Storage, saveTaskToLocalStorage } from "../components/Storage/store";
import { useTranslation } from "react-i18next";
import { NativeSelect } from "@mui/material";
import { locales } from "../i18n/i18n";

type FormValues = {
  task: string;
};

export const ToDoApp = () => {
  const StorageName = "job";
  const [tasks, setTasks] = useState<Task[]>(() => Storage(StorageName));
  const { control, handleSubmit, setValue } = useForm<FormValues>();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language as keyof typeof locales;

  const handleAddTask: SubmitHandler<FormValues> = (data) => {
    if (data.task.trim() !== "") {
      const newTask = {
        id: uuid4(),
        text: data.task,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTaskToLocalStorage(updatedTasks, StorageName);
      setValue("task", "");
    } else {
      alert("No task added yet");
    }
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTaskToLocalStorage(updatedTasks, StorageName);
  };

  const handleCompleteTask = (task: Task) => {
    const updatedTasks = tasks.map((item) =>
      item.id === task.id ? { ...item, completed: true } : item
    );
    setTasks(updatedTasks);
    saveTaskToLocalStorage(updatedTasks, StorageName);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <Container>
      <CustomForm onSubmit={handleSubmit(handleAddTask)}>
        <SelectWrapper>
          <NativeSelect
            id="language-select"
            value={currentLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(locales).map((key) => (
              <option key={key} value={key}>
                {locales[key as keyof typeof locales]}
              </option>
            ))}
          </NativeSelect>
        </SelectWrapper>
        <Controller
          control={control}
          name="task"
          rules={{
            required: { value: true, message: "pleaseEnterThisField" },
            minLength: {
              value: 2,
              message: "pleaseEnterAtLeast2Characters",
            },
          }}
          render={({ fieldState: { error }, field: { onChange, value } }) => {
            return (
              <Wrapper>
                <TextInput
                  value={value}
                  error={error}
                  onChange={onChange}
                  placeholder={t("enterTheThingToDo")}
                />
                <Button $kind={kind.add} onClick={handleSubmit(handleAddTask)}>
                  {t("add")}
                </Button>
              </Wrapper>
            );
          }}
        />
        <FormWrapper>
          <Heading1>{t("thingsToDo")}</Heading1>
          {!tasks.length && <span>{t("listIsEmpty.EnterANewThingToDo")}</span>}
          {tasks.map((item) => (
            <TaskItem
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden; 
`;

const CustomForm = styled.form`
  width: 100%;
  max-width: 700px;
  position: sticky;
  top: 0; 
  z-index: 10; 
  background-color: ${theme.color.primary}; 
  padding: 10px 0;
`;

const SelectWrapper = styled.div`
  position: absolute;
  top: -270px;
  right: -270px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Heading1 = styled.h1`
  ${theme.alignment.center}
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 3px solid #333;
  padding-bottom: 20px;
  user-select: none;
`;



const FormWrapper = styled.ul`
  background-color: ${theme.color.secondary};
  width: 100%;
  max-width: 500px;
  margin-top: 20px; /* Space between the input form and task list */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 3px solid #333;
  border-radius: 10px;
  box-shadow: 5px 10px 0px 5px #333;
  padding: 10px 0;
  height: 60vh; /* Height for task list container */
  overflow-y: auto; /* Enable scrolling inside the task list */
  position: relative;
  span {
    padding: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 10px;

  & > input:first-child {
    width: 100%;
    margin-bottom: 10px;
  }

  & > button:last-child {
    position: absolute;
    top: 50%; /* Vertically center the button */
    right: 0;
    transform: translateY(-50%);
  }
`;