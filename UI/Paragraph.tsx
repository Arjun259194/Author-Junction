import { FC, HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLParagraphElement> {}

const Paragraph: FC<Props> = ({ children, className, ...props }) => {
  return (
    <p {...props} className={`${className} w-10/12 text-lg font-medium leading-relaxed`}>
      {children}
    </p>
  )
}

export default Paragraph
