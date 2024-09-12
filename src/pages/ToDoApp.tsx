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
import { NativeSelect, InputLabel } from "@mui/material";
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
          <InputLabel htmlFor="language-select">{t("language")}</InputLabel>
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
            required: { value: true, message: "please enter this field" },
            minLength: {
              value: 2,
              message: "please enter at least 2 characters",
            },
          }}
          render={({ fieldState: { error }, field: { onChange, value } }) => {
            return (
              <Wrapper>
                <TextInput
                  value={value}
                  error={error}
                  onChange={onChange}
                  placeholder={t("enter the thing to do")}
                />
                <Button $kind={kind.add} onClick={handleSubmit(handleAddTask)}>
                  {t("add")}
                </Button>
              </Wrapper>
            );
          }}
        />
        <FormWrapper>
          <Heading1>{t("things to do")}</Heading1>
          {!tasks.length && <span>{t("List is empty. Enter a new thing to do")}</span>}
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
  min-height: 100vh;
  padding: 50px 0;
`;

const CustomForm = styled.form`
  ${theme.alignment.center}
  width: 50%;
  flex-direction: column;
  position: relative;
`;

const SelectWrapper = styled.div`
  position: absolute;
  top: -70px;
  right: 70px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  span {
    padding: 20px;
  }
`;

const Heading1 = styled.h1`
  ${theme.alignment.center}
  width: 100%;
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
