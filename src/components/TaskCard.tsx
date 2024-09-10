import React, { ChangeEvent, useState } from "react";
import { Button, kind } from "./Button";
import { Task } from "../types/Task";
import styled from "styled-components";

type TaskProps = {
  item: Task;
  onDelete: (id: string) => void;
  onComplete: (task: Task) => void;
};

export const TaskCard = ({ item, onDelete, onComplete }: TaskProps) => {
  const [isChecked, setIsChecked] = useState(item.completed);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    onComplete({ ...item, completed: checked });
  };
  return (
    <StyleTaskCard key={item.id}>
      <CustomWrap>
        <CustomCheckbox
          id={item.id}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={item.id}>{item.text}</label>
      </CustomWrap>
      <Button kind={kind.delete} onClick={() => onDelete(item.id)} text="X" />
    </StyleTaskCard>
  );
};
const StyleTaskCard = styled.div`
  width: 95%;
  margin-bottom: 20px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  transition: all 0.5s ease-in-out;
  &:hover {
    background-color: #b7eec6;
    user-select: none;
    button {
      opacity: 1;
    }
  }
`;
const CustomWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;
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
