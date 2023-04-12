import Link from "next/link"
import { FC } from "react"

interface Props {
  href: string
  children: string
  icon: JSX.Element
}
const ListItem: FC<Props> = ({ href, children, icon }) => (
  <li>
    <Link href={href}>
      <span className="my-0.5 flex aspect-square h-6 w-full items-center rounded-md py-4 px-1 hover:bg-blue-400 hover:text-gray-100  ">
        <span className="aspect-square h-5">{icon}</span>
        <span className="mx-2 text-base tracking-wide">{children}</span>
      </span>
    </Link>
  </li>
)

export default ListItem
