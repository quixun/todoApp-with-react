import React from "react";
import { Button } from "./Button";
import { Task } from "../types/task/Task";
interface TaskProps {
  item: Task; 
  onDelete: (id: string) => void; 
  onComplete: (task: Task) => void; 
};

export const Tasks = ({ item, onDelete, onComplete }: TaskProps) => {
  return (
    <li
      key={item.id}
      className="flex flex-row items-center justify-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="font-bold text-gray-700">ID:</div>
      <div className="text-gray-500">{item.id}</div>
      <div className="font-bold text-gray-700">Task:</div>
      <div className="text-gray-500">{item.text}</div>
      <Button onClick={() => onDelete(item.id)} text={`Remove`} />
      <Button
        onClick={() => onComplete(item)}
        text={item.completed ? `Done` : `Complete`}
        variant={item.completed ? `success` : `primary`}
      />
    </li>
  );
};
