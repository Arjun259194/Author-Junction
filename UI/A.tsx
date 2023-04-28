import { AnchorHTMLAttributes, FC } from "react"

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const A: FC<Props> = ({ className, children, ...props }) => {
  return (
    <a
      className={`${className} cursor-pointer hover:font-semibold hover:text-violet-500 hover:underline `}
      {...props}
    >
      {children}
    </a>
  )
}

export default A
