import { HTMLElementProps } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

const Header: FC<HTMLElementProps> = ({ children, className, ...props }) => {
  return (
    <header {...props} className={`relative z-20 w-full py-3.5 ${className}`}>
      <div className="mx-auto flex w-11/12 items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              className="aspect-square w-12"
              width={50}
              height={50}
              src="/logo.svg"
              alt="logo"
            />
            <h1 className="font-DS text-3xl font-bold">AuthorJunction</h1>
          </div>
        </Link>
        <nav>
          <ul className="flex items-center space-x-6 font-semibold capitalize [&>li:hover]:underline">
            {children}
          </ul>
        </nav>
      </div>
    </header>
  )
}

Header.defaultProps = {
  children: (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li className="">
        <Link href="/about">about</Link>
      </li>
    </>
  ),
}

export default Header
