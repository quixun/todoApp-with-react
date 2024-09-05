import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "success";
};

export const Button = ({
  onClick,
  text,
  type = "button",
  variant = "primary",
}: ButtonProps) => {
  const getButtonClassName = (variant: string) => {
    switch (variant) {
      case "success":
        return "bg-green-500 text-white";
      default:
        return "bg-yellow-200 text-gray-900 hover:text-yellow-200 hover:bg-gray-900 hover:border-yellow-200";
    }
  };

  const defaultClassName = `border border-solid w-24 py-2 rounded-lg transition-all duration-200 ease-in-out border-gray-900 `;

  return (
    <button
      type={type}
      className={`${defaultClassName} ${getButtonClassName(variant)}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
