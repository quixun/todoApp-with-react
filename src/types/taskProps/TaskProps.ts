import { Task } from "../task/Task";

export type TaskProps = {
    item: Task; 
    onDelete: (id: string) => void; 
    onComplete: (task: Task) => void; 
  };
  