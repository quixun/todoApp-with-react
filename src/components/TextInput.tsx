import React, { ChangeEventHandler, ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";

type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: FieldError;
  className?: string;
  placeholder?: string;
};

// Styled components
const StyledInput = styled.input`
  width: 50%;
  height: 35px;
  border-radius: 5px;
  background-color: #fff59d;
  border: 3px solid #333;
  padding-left: 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

// Forward ref with React.forwardRef
export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, onChange, error, className, placeholder }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <StyledInput
          className={className}
          type="text"
          placeholder={placeholder}
          value={value}
          ref={ref}
          onChange={onChange}
        />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </>
    );
  }
);
