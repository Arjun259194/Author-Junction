import { FC, ReactNode } from "react"

const AuthPageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col bg-gradient-to-r from-violet-400 to-cyan-400">
      {children}
    </div>
  )
}

export default AuthPageLayout
