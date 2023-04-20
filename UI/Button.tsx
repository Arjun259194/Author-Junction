import { ButtonHTMLAttributes, FC } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary"
}

const Button: FC<ButtonProps> = ({ variant, className, children, ...props }) => {
  return (
    <button
      className={`rounded-lg border-2 border-violet-500 py-1 px-4 capitalize transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-violet-400 hover:brightness-110 ${
        variant === "primary"
          ? "bg-violet-500 text-blue-50 "
          : "bg-blue-50 text-violet-500"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
