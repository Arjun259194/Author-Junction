import React, { ChangeEvent, ChangeEventHandler } from "react"

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
        className=" peer mt-3 bg-gray-700/30 hover:border-blue-400/50 border-b-2 focus:border-2 font-light border-gray-600/50 focus:bg-gray-700 focus:border-blue-400 text-gray-100 outline-none px-2 py-2 w-full rounded-md text-base"
        value={value}
        type={type}
        onChange={changeHandler}
        placeholder=" "
      />
      <label className=" peer-focus:text-blue-400 peer-focus:text-lg absolute peer-focus:-top-3.5 left-0 peer-focus:px-0 text-gray-500 text-base top-5 px-3 transition-all duration-200" htmlFor={name}>
        {text}
      </label>
    </div>
  )
}
