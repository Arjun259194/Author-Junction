import Image from "next/image"
import Link from "next/link"
import { FC, ReactNode } from "react"

const Header: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className="relative z-20 mx-auto my-4 flex w-10/12 items-center justify-between">
      <Link href="/">
        <div className="flex items-center space-x-2">
          <Image
            className="aspect-square w-12"
            width={50}
            height={50}
            src="/logo.svg"
            alt="logo"
          />
          <h1 className="font-DS text-3xl font-bold text-white">
            AuthorJunction
          </h1>
        </div>
      </Link>
      <nav>
        <ul className="flex space-x-6 font-semibold capitalize text-gray-200 [&>li:hover]:underline">
          {children}
        </ul>
      </nav>
    </header>
  )
}

export default Header
