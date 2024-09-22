import { Task } from "../../types/Task";

export const Storage = (name: string) => {
  return JSON.parse(localStorage.getItem(name) || "[]");
};
export const saveTaskToLocalStorage = (task: Task[], name: string) => {
  return localStorage.setItem(name, JSON.stringify(task));
};
