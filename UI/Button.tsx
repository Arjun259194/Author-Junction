import { ButtonHTMLAttributes, FC } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary"
}

const Button: FC<ButtonProps> = ({ variant, className, children, ...props }) => {
  return (
    <button
      className={`rounded-lg border-2 py-1 px-4  capitalize transition-all  hover:ring hover:ring-cyan-400 hover:brightness-110 ${
        variant === "primary"
          ? "border-cyan-500 bg-cyan-500 text-blue-50"
          : "border-cyan-400 bg-blue-50 text-cyan-500"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
