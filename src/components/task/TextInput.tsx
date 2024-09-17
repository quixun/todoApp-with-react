import React, { ChangeEventHandler } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const errorMessage = error?.message ? t(error.message) : " ";
  return (
    <>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus
      />
      <input type="submit" hidden />
      <ErrorMessage $isVisible={!!error?.message}>
        {t(errorMessage)}
      </ErrorMessage>
    </>
  );
};

const StyledInput = styled.input`
  height: 35px;
  border-radius: 5px;
  background-color: ${theme.color.secondary};
  border: 3px solid #333;
  padding: 0 20% 0 15px;
  font-size: 20px;
  position: relative;
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.span<{ $isVisible: boolean }>`
  height: 20px;
  color: red;
  font-size: 20px;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  display: flex;
  justify-content: flex-start;
  padding: 5px 15px;
  margin-bottom: 5px;
`;
