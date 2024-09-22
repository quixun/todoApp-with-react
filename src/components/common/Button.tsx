import styled from "styled-components";
import { theme } from "../../styles/theme";

export enum kind {
  add,
  delete,
}
export const Button = styled.button<{ $kind: kind }>`
  cursor: pointer;
  font-weight: bold;
  ${(props) =>
    props.$kind === kind.delete
      ? ` opacity: 0;
          transition: opacity 0.1s ease-in-out;
          border: 1px solid #333;
          background-color: ${theme.color.secondary};
          color: red;
          font-size: 20px;
          margin: 0 10px;
          padding: 0 10px;
          border-radius: 5px;
          &:hover{
             font-size: 25px;
          }`
      : `background-color:${theme.color.primary};
         width: 15%;
         border-radius: 5px;
         height: 25px;
         transition: 0.3s ease-in-out;
         &:hover{
          background-color: #b7eec6;
         }
         `};
`;
