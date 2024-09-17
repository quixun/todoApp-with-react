import React, { ChangeEvent, useState } from "react";
import { Button, kind } from "../common/Button";
import { Task } from "../../types/Task";
import styled from "styled-components";
import { Checkbox } from "@mui/material";

type TaskProps = {
  item: Task;
  onDelete: (id: string) => void;
  onComplete: (task: Task) => void;
};

export const TaskItem = ({ item, onDelete, onComplete }: TaskProps) => {
  const [isChecked, setIsChecked] = useState(!!item.completedAt);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    const updatedTask = {
      ...item,
      completedAt: checked ? new Date().toISOString() : null,
    };

    onComplete(updatedTask);
  };

  return (
    <StyleTaskCard key={item.id}>
      <Wrapper>
        <Checkbox
          id={item.id}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <CustomLabel htmlFor={item.id}>{item.description}</CustomLabel>
      </Wrapper>
      <Button $kind={kind.delete} onClick={() => onDelete(item.id)}>
        X
      </Button>
    </StyleTaskCard>
  );
};

const StyleTaskCard = styled.div`
  max-width: 100%;
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow-x: hidden;
`;

const CustomLabel = styled.label`
  text-overflow: clip;
  margin-left: 8px;
  flex: 1;
`;
