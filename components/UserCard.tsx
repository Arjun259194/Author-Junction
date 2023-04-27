import A from "@/UI/A";
import { User } from "@/database/model/User";
import { FC } from "react";

interface Props {
  user: Pick<User, "id" | "username" | "email">
}

const UserCard: FC<Props> = ({ user: { id, username, email } }) => {
  return (
    <article className="flex flex-col border-2 border-gray-200 w-full">
      <A href={`/user/${id}`}>
        <span>{username}</span>
      </A>
      <span>{email}</span>
    </article>
  )
}

export default UserCard;
