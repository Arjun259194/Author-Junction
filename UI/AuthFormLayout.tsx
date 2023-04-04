import { FC, ReactNode } from "react"

const AuthFormLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="relative z-20 mx-auto my-auto h-max w-10/12 ">
      <div className="mx-auto w-1/2 rounded-3xl bg-gray-800 p-5">
        {children}
      </div>
    </main>
  )
}

export default AuthFormLayout
