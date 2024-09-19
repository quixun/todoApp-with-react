import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styled from "styled-components";
import { TextInput } from "../components/task/TextInput";
import { TaskItem } from "../components/task/TaskItem";
import { Task } from "../types/Task";
import { theme } from "../styles/theme";
import { Button, kind } from "../components/common/Button";
import { useTranslation } from "react-i18next";
import { NativeSelect, Pagination } from "@mui/material";
import { locales } from "../i18n/i18n";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addTask,
  completeTask,
  deleteTask,
  getTodoList,
  setPage,
} from "../redux/tasks/taskSlice";

type FormValues = {
  task: string;
};

export const ToDoApp = () => {
  const { tasks, page, total, limit } = useSelector(
    (state: RootState) => state.tasks
  );
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, setValue } = useForm<FormValues>();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language as keyof typeof locales;

  const handleAddTask: SubmitHandler<FormValues> = async (data) => {
    console.log("add function is called");

    if (data.task.trim() !== "") {
      try {
        await dispatch(addTask({ description: data.task }));
        setValue("task", "");

        // Fetch the updated task list after adding a new task
        dispatch(getTodoList({ description: "", limit, page }));
      } catch (error) {
        console.error("Error adding task:", error);
      }
    } else {
      alert("No task added yet");
    }
  };

  const handleDeleteTask = useCallback(
    async (id: string) => {
      console.log("delete function is called");

      try {
        await dispatch(deleteTask(id));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    [dispatch]
  );

  const handleCompleteTask = async (task: Task) => {
    try {
      const completedAt = new Date().toISOString();
      await dispatch(completeTask({ taskId: task.id, completedAt }));
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    i18n.changeLanguage(event.target.value as string);
  };

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(setPage(value - 1));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getTodoList({ description: "", limit, page }));
  }, [dispatch, page, limit]);

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
            minLength: { value: 2, message: "pleaseEnterAtLeast2Characters" },
          }}
          render={({ fieldState: { error }, field: { onChange, value } }) => (
            <Wrapper>
              <TextInput
                value={value}
                error={error}
                onChange={onChange}
                placeholder={t("enterTheThingToDo")}
              />
              <Button $kind={kind.add} type="submit" onClick={() => handleAddTask}>
                {t("add")}
              </Button>
            </Wrapper>
          )}
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
          <PaginationWrapper>
            <Pagination
              count={Math.ceil(total / limit)}
              page={page + 1}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </PaginationWrapper>
        </FormWrapper>
      </CustomForm>
    </Container>
  );
};

// Styled Components...
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.primary};
  height: 100vh;
  overflow: hidden;
  padding: 20px; /* Added padding */
  box-sizing: border-box; /* Added to prevent overflow */
`;

const CustomForm = styled.form`
  width: 100%;
  max-width: 800px;
  background-color: ${theme.color.primary};
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  box-sizing: border-box; /* Added to prevent overflow */
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
  margin-bottom: 10px;
  border-bottom: 3px solid #333;
  padding-bottom: 10px;
  text-align: center;
  font-size: 1.5rem;
  user-select: none;
`;

const TaskList = styled.div`
  width: 100%;
  overflow-y: auto; /* Added to handle overflow */
  flex: 1;
`;

const FormWrapper = styled.div`
  margin-top: 0;
  background-color: ${theme.color.secondary};
  width: 100%;
  max-width: 500px;
  padding: 10px 10px 0 10px;
  border: 3px solid #333;
  border-radius: 10px;
  box-shadow: 10px 10px 0 10px rgba(0, 0, 0, 0.7);
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-sizing: border-box; /* Added to prevent overflow */
`;

const PaginationWrapper = styled.div`
  margin-top: auto; /* Pushes the pagination to the bottom */
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box; /* Added to prevent overflow */
`;
