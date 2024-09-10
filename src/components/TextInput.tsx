import React, { ChangeEventHandler } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";
import { theme } from "../styles/theme";

type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: FieldError;
  placeholder?: string;
};

export const TextInput = ({
  value,
  onChange,
  error,
  placeholder,
}: InputProps) => {
  return (
    <>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus
      />
      <input type="submit" hidden/>
      <ErrorMessage isVisible={!!error?.message}>
        {error?.message || " "}
      </ErrorMessage>
    </>
  );
};

const StyledInput = styled.input`
  width: 80%;
  height: 35px;
  border-radius: 5px;
  background-color: ${theme.color.secondary};
  border: 3px solid #333;
  padding-left: 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  position: relative;
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.label<{ isVisible: boolean }>`
  height: 20px;
  color: red;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  display: flex;
  justify-content: flex-start;
`;
