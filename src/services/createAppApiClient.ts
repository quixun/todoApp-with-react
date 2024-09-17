import { AxiosInstance } from "axios";
import { createApiClient } from "./createApiClient";

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
    endpoint: `${process.env.REACT_APP_API_ADDRESS}/tasks/search`,
    fetchAccessToken,
  });

  return {
    googleLogin: googleLogin(ggApiClient),
    getTodoList: getTodoList(appApiClient),
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
    description: string; page: number; limit: number
  }
// Function to get the list of tasks
const getTodoList =
  (api: AxiosInstance) =>
  async (req: GetTodoListRequest): Promise<any> => {
    const res = await api.post("", req); 
    return res.data;
  };


