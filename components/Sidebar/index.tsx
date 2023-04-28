import { User } from "@/database/model/User"
import { FC } from "react"
import BtnGroup from "./BtnGroup"
import SidebarNavbar from "./NavCard"
import ProfileCard from "./ProfileCard"

interface Props {
  user: User
}

const Sidebar: FC<Props> = ({ user: { username, email, role } }) => {
  return (
    <aside className=" flex max-h-full w-1/6 min-w-max flex-col justify-between px-2 text-gray-900">
      <div className="space-y-4">
        <ProfileCard username={username} email={email} role={role} />
        <hr />
        <SidebarNavbar />
      </div>
      <BtnGroup />
    </aside>
  )
}

export default Sidebar
