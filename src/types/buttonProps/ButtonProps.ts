export type ButtonProps = {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "success";
  };
  