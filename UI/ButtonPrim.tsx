import { FC, MouseEventHandler, ReactNode } from "react"

interface Props {
  clickHandler: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

const Button: FC<Props> = ({ clickHandler, children }) => {
  return <button className=" px-6 py-2 rounded-full  text-xl  bg-blue-500 text-white hover:brightness-110" onClick={clickHandler}> {children}</button>
}

export default Button
