import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  kind: kind;
}

export enum kind {
  add = "add",
  delete = "delete",
}

export const Button = ({ onClick, text, kind }: ButtonProps) => {
  return (
    <DeleteButton $kind={kind} onClick={onClick}>
      {text}
    </DeleteButton>
  );
};

const DeleteButton = styled.button<{ $kind: kind.add | kind.delete }>`
  ${(props) =>
    props.$kind === kind.delete
      ? ` opacity: 0;transition: opacity 0.1s ease-in-out;
          border: none;
          background-color: transparent;
          color: red;
          font-weight: bold;
          font-size: 20px;
          &:hover{
             
          }`
      : `background-color:${theme.color.primary};
         width: 15%;
         border-radius: 5px;
         font-weight: bold;
         height: 25px;
         transition: 0.3s ease-in-out;
         &:hover{
          background-color: #56e356;
          color: #fff;
         }
         `};
`;
