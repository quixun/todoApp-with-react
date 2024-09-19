import { AxiosInstance } from "axios";
import { createApiClient } from "./createApiClient";

// Define the request type for adding a task
export type AddTaskRequest = {
  description: string;
};

// Modify the `createAppApiClient` to include the `addTask` function
export const createAppApiClient = () => {
  const fetchAccessToken = async (): Promise<string> => {
    return localStorage.getItem("auth_token") || "";
  };

  // Google Authentication API client
  const ggApiClient = createApiClient({
    endpoint: `${process.env.REACT_APP_API_ADDRESS}/auth/google`,
    fetchAccessToken,
  });

  // App API client (for tasks)
  const appApiClient = createApiClient({
    endpoint: `${process.env.REACT_APP_API_ADDRESS}/tasks`,
    fetchAccessToken,
  });

  return {
    googleLogin: googleLogin(ggApiClient),
    getTodoList: getTodoList(appApiClient),
    addTask: addTask(appApiClient), 
    deleteTask: deleteTask(appApiClient), 
    completeTask: completeTask(appApiClient)
  };
};

// Function to handle Google login API request
const googleLogin =
  (api: AxiosInstance) =>
  async (req: { token: string }): Promise<any> => {
    const res = await api.post("", req);
    return res.data;
  };

export type GetTodoListRequest = {
  description: string;
  page: number;
  limit: number;
};

// Function to get the list of tasks
const getTodoList =
  (api: AxiosInstance) =>
  async (req: GetTodoListRequest): Promise<any> => {
    const res = await api.post("/search", req);
    return res.data;
  };

// Add the function to handle adding a task
const addTask =
  (api: AxiosInstance) =>
  async (req: AddTaskRequest): Promise<any> => {
    const res = await api.post("", req);
    return res.data;
  };

  const deleteTask =
  (api: AxiosInstance) =>
  async (taskId: string): Promise<any> => {
    const res = await api.delete(`/${taskId}`);
    return res.data;
  };

// Function to handle completing a task
const completeTask =
  (api: AxiosInstance) =>
  async (taskId: string, completedAt: string): Promise<any> => {
    const res = await api.patch(`/${taskId}`, { completedAt });
    return res.data;
  };