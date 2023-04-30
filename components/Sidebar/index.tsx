import { User } from "@/database/model/User"
import { FC } from "react"
import BtnGroup from "./BtnGroup"
import SidebarNavbar from "./NavCard"
import ProfileCard from "./ProfileCard"
import Button from "@/UI/Button"

interface Props {
  user: User
  searchToggle: () => void
}

const Sidebar: FC<Props> = ({ user: { username, email, role }, searchToggle }) => {
  return (
    <aside className="flex max-h-full w-3/12 min-w-max flex-col justify-between px-2 text-gray-900">
      <div className="space-y-4">
        <Button className="w-full" onClick={searchToggle} variant="secondary">
          Search
        </Button>
        <ProfileCard username={username} email={email} role={role} />
        <hr />
        <SidebarNavbar />
      </div>
      <BtnGroup />
    </aside>
  )
}

export default Sidebar
