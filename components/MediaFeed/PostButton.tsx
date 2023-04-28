import { ButtonHTMLAttributes, FC } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PostButton: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`${className} group flex items-center space-x-2 rounded-full px-4 py-1 transition-colors duration-200 `}
      {...props}
    >
      {children}
    </button>
  )
}

export default PostButton
