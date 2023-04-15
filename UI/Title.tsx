import { FC, HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLHeadingElement> {}

const Title: FC<Props> = ({ className, children, ...props }) => (
  <h1 {...props} className={`${className}  text-5xl font-bold capitalize`}>
    {children}
  </h1>
)

export default Title
