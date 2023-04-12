import { authorIcon, readerIcon } from "@/assets/icons"
import { User } from "@/database/model/User"
import { FC } from "react"

interface Props {
  user: {
    email: User["email"]
    role: User["role"]
    username: User["username"]
    following: User["following"]
    followers: User["followers"]
  }
}

const UserProfile: FC<Props> = ({
  user: { username, email, role, followers, following },
}) => (
  <section className="flex cursor-default flex-col items-center text-gray-900">
    <div className="flex flex-col items-center">
      <span className="block aspect-square h-20 text-gray-800">
        {role === "READER" ? readerIcon : authorIcon}
      </span>
      <h2 className="text-5xl font-semibold capitalize ">{username}</h2>
      <span className="text-2xl font-semibold text-gray-700">
        Hey! {role === "READER" ? "Reader" : "Author"}
      </span>
      <span className="text-sm text-gray-500 hover:text-blue-500">{email}</span>
    </div>
    <div className="my-2 flex w-1/5 items-center justify-around space-x-4 capitalize">
      <div className="flex w-1/2 justify-around rounded-md border border-gray-300 bg-gray-50 p-2 shadow-sm">
        <span>Follower</span>
        <span>{followers.length}</span>
      </div>
      <div className="flex w-1/2 justify-around rounded-md border border-gray-300 bg-gray-50 p-2 shadow-sm">
        <span>following</span>
        <span>{following.length}</span>
      </div>
    </div>
  </section>
)

export default UserProfile
