import { setTasks } from "../redux/tasks/taskSlice";
import { AppDispatch } from "../redux/store";
import { createAppApiClient } from "./createAppApiClient";

export const loginRequest = async (
  googleToken: string | undefined,
  login: (token: string) => void,
  dispatch: AppDispatch
) => {
  if (!googleToken) {
    console.error("Google token not available");
    return;
  }

  try {
    const { googleLogin, getTodoList } = createAppApiClient();

    const authResponse = await googleLogin({ token: googleToken });

    if (!authResponse || !authResponse.accessToken) {
      throw new Error("Failed to retrieve access token from Google login");
    }

    const accessToken = authResponse.accessToken;
    login(accessToken);

    const tasksResponse = await getTodoList({
      description: "",
      page: 0,
      limit: 5,
    });

    dispatch(setTasks(tasksResponse));
    localStorage.setItem("tasks", JSON.stringify(tasksResponse.tasks));
  } catch (error: any) {
    console.error("Error during login and task fetching:", error);
  }
};
