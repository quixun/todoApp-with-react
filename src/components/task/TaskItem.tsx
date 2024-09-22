import React, { ChangeEvent, memo } from "react";
import { Button, kind } from "../common/Button";
import { Task } from "../../types/Task";
import styled from "styled-components";
import { Checkbox } from "@mui/material";

type TaskProps = {
  item: Task;
  onDelete: (id: string) => void;
  onComplete: (task: Task) => Promise<void>;
  onUncomplete: (task: Task) => Promise<void>;
};

export const TaskItem = memo(({ item, onDelete, onComplete, onUncomplete }: TaskProps) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    const updatedTask = {
      ...item,
      completedAt: checked ? new Date().toISOString() : null,
    };

    if (checked) {
      onComplete(updatedTask);
    } else {
      onUncomplete(updatedTask);
    }
  };

  return (
    <StyleTaskCard key={item.id}>
      <Wrapper>
        <Checkbox
          id={item.id}
          checked={!!item.completedAt}
          onChange={handleCheckboxChange}
        />
        <CustomLabel htmlFor={item.id}>{item.description}</CustomLabel>
      </Wrapper>
      <Button
        $kind={kind.delete}
        onClick={(event) => {
          event.stopPropagation();
          onDelete(item.id);
        }}
      >
        X
      </Button>
    </StyleTaskCard>
  );
});

// Styled components...
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
