import { User } from "@/database/model/User"
import Link from "next/link"
import { FC } from "react"

interface Props {
  user: Pick<User, "id" | "username" | "email" | "following" | "followers">
}

const UserCard: FC<Props> = ({ user: { id, username, email, following, followers } }) => {
  return (
    <Link className="" href={`/user/${id}`}>
      <article className="group flex w-full items-center justify-between rounded-md border-2 border-gray-300 bg-gray-100 p-2 text-gray-900 shadow-md hover:bg-violet-600 hover:text-gray-100">
        <div>
          <h4 className="text-2xl font-semibold capitalize">{username}</h4>
          <span>{email}</span>
        </div>
        <div className="flex translate-y-full flex-col capitalize opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <span>following {following.length}</span>
          <span>followers {followers.length}</span>
        </div>
      </article>
    </Link>
  )
}

export default UserCard
