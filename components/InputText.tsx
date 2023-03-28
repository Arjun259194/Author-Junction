import { ChangeEventHandler } from "react"

interface Props {
  type: "text" | "email" | "password"
  changeHandler: ChangeEventHandler<HTMLInputElement>
  value: number | string
  name: string
  text: string
}

export default function InputText({ type, changeHandler, value, name, text }: Props) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        className="
        peer mt-4 w-full rounded-md border-b-2 border-gray-600
        bg-gray-700/60 px-2 py-2 text-lg font-light text-gray-100 outline-none transition-all
        duration-100 ease-linear placeholder-shown:mt-0 hover:border-blue-400
        focus:border-2 focus:border-blue-400 focus:bg-gray-700
        "
        value={value}
        type={type}
        onChange={changeHandler}
        placeholder=" "
      />
      <label
        className="
        absolute -top-4 left-0 px-0 text-2xl text-blue-400
        transition-all duration-200 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:left-0 
        peer-placeholder-shown:px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        "
        htmlFor={name}
      >
        {text}
      </label>
    </div>
  )
}
