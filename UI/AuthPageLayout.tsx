import { FC, ReactNode } from "react"

const AuthPageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col bg-[url('/bg.jpg')] bg-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-300 to-transparent"></div>
      {children}
    </div>
  )
}

export default AuthPageLayout
