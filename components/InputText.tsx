import { ChangeEventHandler } from "react"

interface Props {
  type: "text" | "email" | "password"
  changeHandler: ChangeEventHandler<HTMLInputElement>
  value: number | string
  name: string
  text: string
  required: boolean
}

export default function InputText({
  type,
  required,
  changeHandler,
  value,
  name,
  text,
}: Props) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        className="
        peer mt-4 w-full rounded border-b-2 border-gray-600
        bg-gray-100 px-2 py-2 text-lg font-light text-gray-900 outline-none transition-all
        duration-100 ease-linear placeholder-shown:mt-0 hover:border-blue-400
        focus:border-blue-600 
        "
        value={value}
        type={type}
        onChange={changeHandler}
        required={required}
        placeholder=" "
      />
      <label
        className="
        absolute -top-4 left-0 px-0 text-xl text-blue-600
        transition-all duration-200 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:left-0 
        peer-placeholder-shown:px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
        "
        htmlFor={name}
      >
        {text}
      </label>
    </div>
  )
}
