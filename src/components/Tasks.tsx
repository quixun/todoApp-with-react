import React from "react";
import { Button } from "./Button.tsx";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskProps = {
  item: Task; 
  index: number; 
  handleDeleteTask: (id: number) => void; 
  handleCompleteTask: (task: Task) => void; 
};

export const Tasks = ({ item, index, handleDeleteTask, handleCompleteTask }: TaskProps) => {
  return (
    <li
      key={`${item.id}-${index}`} //id-index
      className="flex flex-row items-center justify-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="font-bold text-gray-700">ID:</div>
      <div className="text-gray-500">{item.id}</div>
      <div className="font-bold text-gray-700">Task:</div>
      <div className="text-gray-500">{item.text}</div>
      <Button onClick={() => handleDeleteTask(item.id)} name={`Remove`} />
      <Button
        onClick={() => handleCompleteTask(item)}
        name={item.completed ? `Done` : `Complete`}
      />
    </li>
  );
}

