import { User } from "@/database/model/User"
import { FC } from "react"
import BtnGroup from "./BtnGroup"
import SidebarNavbar from "./NavCard"
import ProfileCard from "./ProfileCard"
import Button from "@/UI/Button"
import FadeIn from "@/UI/FadeIn"

interface Props {
  user: User
  searchToggle: () => void
}

const Sidebar: FC<Props> = ({ user: { username, email, role }, searchToggle }) => {
  return (
    <aside className="flex max-h-full w-3/12 min-w-max flex-col justify-between px-2 text-gray-900">
      <div className="space-y-4">
        <FadeIn>
          <Button className="w-full" onClick={searchToggle} variant="secondary">
            Search
          </Button>
        </FadeIn>
        <FadeIn>
          <ProfileCard username={username} email={email} role={role} />
        </FadeIn>
        <hr />
        <FadeIn>
          <SidebarNavbar />
        </FadeIn>
      </div>
      <FadeIn>
        <BtnGroup />
      </FadeIn>
    </aside>
  )
}

export default Sidebar
