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
  async (task) => {
    const newTask = await apiClient.addTask(task); 
    console.log("Newly added task:", newTask);
    return newTask; 
  }
);

export const deleteTask = createAsyncThunk<any, string>(
  "tasks/deleteTask",
  async (id) => {
    await apiClient.deleteTask(id);
    return id; 
  }
);

export const completeTask = createAsyncThunk<
  Task, // Return type
  { taskId: string; completedAt: string }
>("tasks/completeTask", async ({ taskId, completedAt }, { extra: api }) => {
  const task = await apiClient.completeTask(taskId, completedAt);
  return task; // Return the complete task object
});

export const uncompleteTask = createAsyncThunk<
  Task, // Return type
  { taskId: string; completedAt: string }
>("tasks/uncompleteTask", async ({ taskId, completedAt }, { extra: api }) => {
  const task = await apiClient.uncompleteTask(taskId, completedAt);
  return task; // Return the incomplete task object
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
        // 
      })
      .addCase(deleteTask.fulfilled, (state, action) => {

        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      })
      .addCase(uncompleteTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });
  },
});

export const { incrementPage, setPage, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
