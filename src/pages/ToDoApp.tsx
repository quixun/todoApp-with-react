import React, { useCallback, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styled from "styled-components";
import { TextInput } from "../components/task/TextInput";
import { TaskItem } from "../components/task/TaskItem";
import { Task } from "../types/Task";
import { theme } from "../styles/theme";
import { Button, kind } from "../components/common/Button";
import { useTranslation } from "react-i18next";
import { Pagination } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addTask,
  completeTask,
  deleteTask,
  getTodoList,
  setPage,
  uncompleteTask,
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
  const { t } = useTranslation();

  const handleAddTask: SubmitHandler<FormValues> = async (data) => {
    if (data.task.trim() !== "") {
      try {
        await dispatch(addTask({ description: data.task })).unwrap();
        setValue("task", "");
        // dispatch(getTodoList({ description: "", limit, page }));
      } catch (error) {
        console.error("Error adding task:", error);
      }
    } else {
      alert("No task added yet");
    }
  };

  const handleDeleteTask = useCallback(
    async (id: string) => {
      try {
        await dispatch(deleteTask(id)).unwrap();
        dispatch(getTodoList({ description: "", limit, page }));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    [dispatch, limit, page]
  );

  const handleCompleteTask = async (task: Task) => {
    try {
      const completedAt = new Date().toISOString();
      await dispatch(completeTask({ taskId: task.id, completedAt }));
      // No need to refetch tasks here since the state is updated directly
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleUncompleteTask = async (task: Task) => {
    try {
      const completedAt = ""; // Set to empty or null based on your API requirement
      await dispatch(uncompleteTask({ taskId: task.id, completedAt }));
    } catch (error) {
      console.error("Error uncompleting task:", error);
    }
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
              <Button $kind={kind.add} type="submit">
                {t("add")}
              </Button>
            </Wrapper>
          )}
        />
        <FormWrapper>
          <Heading1>{t("thingsToDo")}</Heading1>
          <TaskList>
            {tasks && tasks.length > 0 ? (
              tasks.map((item: Task) => (
                <TaskItem
                  key={item.id}
                  item={item}
                  onComplete={handleCompleteTask}
                  onUncomplete={handleUncompleteTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <span>{t("listIsEmpty.EnterANewThingToDo")}</span>
            )}
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
  padding: 20px;
  box-sizing: border-box;
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
  box-sizing: border-box;
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
  box-sizing: border-box;
`;

const PaginationWrapper = styled.div`
  margin-top: auto;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;
