import React from "react";
import { Button, ButtonVariant } from "./Button";
import { Task } from "../types/task/Task";
import styled from "styled-components";

interface TaskProps {
  item: Task;
  onDelete: (id: string) => void;
  onComplete: (task: Task) => void;
}

export const TaskCard = ({ item, onDelete, onComplete }: TaskProps) => {
  const TaskCard = styled.div`
    width: 95%;
    margin-bottom: 20px; 
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    transition: all 0.5s ease-in-out;
      &:hover{
        background-color: #ffff;
        user-select: none;
      }
  `
  const CustomCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid #333;
  background-color: #fff;
  margin-right: 10px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #68d391;
    border-color: #68d391;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background-color: #fff;
    clip-path: polygon(0% 50%, 40% 90%, 100% 10%);
    transform: translate(-50%, -50%);
  }

`;

  return (
    <TaskCard key={item.id}>
        <CustomCheckbox id={item.id} />
        <label htmlFor={item.id}>{item.text}</label>
        <Button onClick={() => onDelete(item.id)} text="X" />
      {/* <Button onClick={() => onDelete(item.id)} text="Remove" />
      <Button
        onClick={() => onComplete(item)}
        text={item.completed ? "Done" : "Complete"}
        variant={
          item.completed ? ButtonVariant.secondary : ButtonVariant.primary
        }
      /> */}
    </TaskCard>
  );
};
