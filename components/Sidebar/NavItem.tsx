import Link from "next/link";
import { FC } from "react";

interface Props {
  href: string;
  children: string;
  icon: JSX.Element;
}
const ListItem: FC<Props> = ({ href, children, icon }) => (
  <li>
    <Link href={href}>
      <span className="my-0.5 flex aspect-square h-6 w-full items-center justify-between space-x-2 rounded-md py-4 px-1 hover:bg-blue-400 hover:text-gray-100  ">
        <span>{children}</span>
        <span className="aspect-square h-6">{icon}</span>
      </span>
    </Link>
  </li>
);

export default ListItem;
