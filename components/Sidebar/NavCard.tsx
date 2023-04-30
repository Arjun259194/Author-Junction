import { aboutMiniIcon, followIcon, homeMiniIcon } from "@/assets/icons"
import ListItem from "./ListItem"

const SidebarNavbar = () => {
  return (
    <nav className="rounded-lg border-2 border-gray-300 bg-gray-50 p-2">
      <ul className="text-lg capitalize">
        <ListItem icon={homeMiniIcon} href="/">
          home
        </ListItem>
        <hr />
        <ListItem icon={aboutMiniIcon} href="/about">
          about
        </ListItem>
        <hr />
        <ListItem icon={followIcon} href="/user/following">
          following
        </ListItem>
      </ul>
    </nav>
  )
}

export default SidebarNavbar
