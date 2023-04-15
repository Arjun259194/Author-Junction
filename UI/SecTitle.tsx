import { FC, HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLHeadingElement> {}

const SecTitle: FC<Props> = ({ className, children, ...props }) => (
  <h3 {...props} className={`${className} text-4xl font-semibold capitalize`}>
    {children}
  </h3>
)

export default SecTitle
