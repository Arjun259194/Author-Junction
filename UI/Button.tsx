import { ButtonHTMLAttributes, FC } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary"
}

const Button: FC<ButtonProps> = ({ variant, className, children, ...props }) => {
  return (
    <button
      className={`rounded-lg border-2 py-1 px-4  capitalize transition-all hover:brightness-110 ${
        variant === "primary"
          ? "border-cyan-600 bg-cyan-600 text-blue-50"
          : "border-cyan-600 bg-blue-50 text-cyan-600"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
