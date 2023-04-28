import A from "@/UI/A"
import Image from "next/image"
import { locationIcon } from "@/assets/icons"
import { HTMLElementProps } from "@/utils/types"
import { FC } from "react"
import Link from "next/link"
import Button from "@/UI/Button"

const Footer: FC<HTMLElementProps> = ({ className, ...props }) => {
  return (
    <footer
      {...props}
      className={`${className} space-y-4 bg-cyan-900 px-5 py-4 text-gray-200 `}
    >
      <div className="flex w-full items-center justify-between">
        <div className="">
          <p className="capitalize">&copy; AuthorJunction. All Rights Reserved</p>
          <p className="capitalize">ML institute of Diploma studies</p>
          <p className="flex capitalize">
            <span className="aspect-square h-6">{locationIcon}</span> mehsana, gujarat
          </p>
          <p>+91 8200271084</p>
          <p>+91 9537711468</p>
          <p>arjun259194@gmail.com</p>
          <p>radhepatel2004@gmail.com</p>
        </div>
        <div className="flex h-full flex-col justify-around space-y-2 text-end capitalize">
          <A target="_blank" href="https://www.instagram.com/_radhe_patel_5lp/">
            instagram
          </A>
          <A target="_blank" href="https://twitter.com/arjun31690705">
            twitter
          </A>
          <A target="_blank" href="https://github.com/Arjun259194">
            github
          </A>
        </div>
      </div>
      <hr className="mx-4" />
      <div className="flex items-center justify-between">
        <Image
          className="aspect-square w-12"
          width={50}
          height={50}
          src="/logo.svg"
          alt="logo"
        />
        <ul className="flex items-center space-x-6 capitalize">
          <li>
            <Link href={`/`}>home</Link>
          </li>
          <li>
            <Link href={`/about`}>about</Link>
          </li>
          <li>
            <Link href={`/user/profile`}>profile</Link>
          </li>
          <li>
            <Link href={`/media`}>media</Link>
          </li>
          {/* <li> */}
          {/*   <Link href={`/auth/login`}> */}
          {/*     <Button variant="primary"> */}
          {/*       login */}
          {/*     </Button> */}
          {/*   </Link> */}
          {/* </li> */}
        </ul>
      </div>
    </footer>
  )
}

/* 
© [Year] [Your Company Name]. All Rights Reserved.

[Your Company Address]
[City, State ZIP Code]
[Phone Number]
[Email Address]
*/

export default Footer
