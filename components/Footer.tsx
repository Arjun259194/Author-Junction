import A from "@/UI/A"
import { locationIcon } from "@/assets/icons"
import { HTMLElementProps } from "@/utils/types"
import { FC } from "react"

const Footer: FC<HTMLElementProps> = ({ className, ...props }) => {
  return (
    <footer
      {...props}
      className={`${className} flex items-start justify-between px-5 py-4 `}
    >
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
      <div className="flex h-full flex-col justify-around text-start capitalize">
        <A>instagram</A>
        <A>twitter</A>
        <A>github</A>
        <A>discord</A>
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
