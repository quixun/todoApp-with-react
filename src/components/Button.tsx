import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: ButtonVariant;
}

export enum ButtonVariant {
  primary = "primary",
  secondary = "secondary",
}

export const Button = ({ onClick, text, variant = ButtonVariant.primary }: ButtonProps) => {
  const getButtonClassName = (variant: ButtonVariant) => {
    switch (variant) {
      case ButtonVariant.secondary:
        return "bg-green-500 text-white";
      default:
        return "bg-yellow-200 text-gray-900 hover:text-yellow-200 hover:bg-gray-900 hover:border-yellow-200";
    }
  };

  const defaultClassName = `border border-solid w-24 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-900 `;

  return (
    <button
      className={`${defaultClassName} ${getButtonClassName(variant)}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
