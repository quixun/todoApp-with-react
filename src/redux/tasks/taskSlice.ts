import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";
import {
  createAppApiClient,
  GetTodoListRequest,
  AddTaskRequest,
} from "../../services/createAppApiClient";

type TasksState = {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
};

const initialState: TasksState = {
  tasks: [],
  total: 0,
  page: 0,
  limit: 5,
};

const apiClient = createAppApiClient();

export const addTask = createAsyncThunk<any, AddTaskRequest>(
  "tasks/addTask",
  async (task, { dispatch }) => {
    await apiClient.addTask(task);
    dispatch(getTodoList({ description: "", limit: 5, page: 0 })); // Refetch tasks after adding
  }
);

export const deleteTask = createAsyncThunk<any, string>(
  "tasks/deleteTask",
  async (id) => {
    await apiClient.deleteTask(id);
    return id; // Return the id for easier filtering in reducers
  }
);

export const completeTask = createAsyncThunk<
  any,
  { taskId: string; completedAt: string }
>("tasks/completeTask", async ({ taskId, completedAt }) => {
  await apiClient.completeTask(taskId, completedAt);
  return { taskId, completedAt }; // Return data for easier updating in reducers
});

export const getTodoList = createAsyncThunk<any, GetTodoListRequest>(
  "tasks/getTodoList",
  async (params) => {
    const response = await apiClient.getTodoList(params);
    return response;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTasks(state, action) {
      const { tasks, total, page, limit, mode } = action.payload;

      if (mode === "append") {
        state.tasks = [...state.tasks, ...tasks];
      } else if (mode === "clear") {
        state.tasks = tasks;
      } else {
        state.tasks = tasks;
      }

      state.total = total !== undefined ? total : state.total;
      state.page = page !== undefined ? page : state.page;
      state.limit = limit !== undefined ? limit : state.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodoList.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        // Refetch the task list or use the setTasks action to refresh the list
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, completedAt: action.payload.completedAt }
            : task
        );
      });
  },
});

export const { incrementPage, setPage, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
