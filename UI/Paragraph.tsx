import { FC, HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLParagraphElement> {}

const Paragraph: FC<Props> = ({ children, className, ...props }) => {
  return (
    <p {...props} className={`${className} w-3/4 text-lg leading-relaxed`}>
      {children}
    </p>
  )
}

export default Paragraph
