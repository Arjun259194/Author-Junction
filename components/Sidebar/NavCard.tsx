import { aboutMiniIcon, contactMiniIcon, homeMiniIcon } from "@/assets/icons";
import ListItem from "./NavItem";

const SidebarNavbar = () => {
  return (
    <nav className="rounded-lg bg-gray-100 p-2">
      <ul className="text-lg capitalize">
        <ListItem icon={homeMiniIcon} href="/">
          home
        </ListItem>
        <hr />
        <ListItem icon={aboutMiniIcon} href="/about">
          about
        </ListItem>
        <hr />
        <ListItem icon={contactMiniIcon} href="/contact">
          contact
        </ListItem>
      </ul>
    </nav>
  );
};

export default SidebarNavbar;
