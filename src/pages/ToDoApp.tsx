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
          <TaskList>
            {tasks.map((item) => (
              <TaskItem
                key={item.id}
                item={item}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </TaskList>
        </FormWrapper>
      </CustomForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.primary};
  height: 100vh;
  overflow: hidden;
`;

const CustomForm = styled.form`
  width: 100%;
  max-width: 800px;
  background-color: ${theme.color.primary};
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  position: sticky;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 500px;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;

  & > input {
    flex: 1;
    margin-right: 5px;
  }

  & > button {
    position: absolute;
    height: auto;
    right: 20px;
    top: 3px;
  }
`;

const SelectWrapper = styled.div`
  position: fixed;
  top: 70px; 
  right: 50px; 
  z-index: 1000;
`;

const Heading1 = styled.h1`
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 3px solid #333;
  padding-bottom: 10px;
  text-align: center;
  font-size: 1.5rem;
  user-select: none;
`;
const TaskList = styled.div`
  overflow-y: auto;
  width: 100%;
`
const FormWrapper = styled.ul`
  margin-top: 0;
  background-color: ${theme.color.secondary};
  width: 100%;
  max-width: 500px;
  padding: 10px;
  border: 3px solid #333;
  border-radius: 10px;
  box-shadow: 10px 10px 0 10px rgba(0, 0, 0, 0.7);
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box;

  span {
    padding: 20px;
  }
`;


