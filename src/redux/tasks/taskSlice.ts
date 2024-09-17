import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from '../../types/Task';
import { createAppApiClient, GetTodoListRequest } from '../../services/createAppApiClient';

type TasksState = {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}

const initialState: TasksState = {
  tasks: [],
  total: 0,
  page: 0,
  limit: 5, 
};

const apiClient = createAppApiClient();

export const getTodoList = createAsyncThunk<any,GetTodoListRequest>(
  'tasks/getTodoList',
 apiClient.getTodoList
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodoList.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    });
  }
});

export const { incrementPage, setPage } = tasksSlice.actions;
export default tasksSlice.reducer;
