import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({ variant, className, children, ...props }) => {
  return (
    <button
      className={`${className} rounded-lg border-2 border-violet-600 py-2 px-4 hover:brightness-110 ${
        variant === "primary" ? "bg-violet-600 text-violet-50 " : "bg-violet-100 text-violet-600"
      }`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
