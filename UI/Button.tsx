import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({ variant, className, children, ...props }) => {
  return (
    <button
      className={`rounded-lg border-2 border-blue-600 py-1 px-4 hover:brightness-110 ${
        variant === "primary" ? "bg-blue-600 text-blue-50 " : "bg-blue-100 text-blue-600"
      } ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
