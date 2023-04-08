import { authorIcon, readerIcon } from "@/assets/icons";
import { User } from "@/database/model/User";
import { FC } from "react";

interface Props {
  username: string;
  email: string;
  role: User["role"];
}

const ProfileCard: FC<Props> = ({ username, email, role }) => {
  return (
    <div className="rounded-lg bg-gray-100 p-2 ">
      <div className="flex items-center">
        <h3 className=" text-3xl font-bold capitalize text-gray-900">{username}</h3>
        <span className="group relative mx-2 aspect-square h-6 text-gray-800">
          {role === "READER" ? readerIcon : authorIcon}
          <span className="absolute top-0 left-full mx-2 scale-0 rounded bg-gray-800 p-1 font-semibold text-gray-100 opacity-0 transition-transform group-hover:scale-100 group-hover:opacity-100">
            {role === "READER" ? "Reader" : "Author"}
          </span>
        </span>
      </div>
      <hr />
      <p className="text-gray-500">{email}</p>
    </div>
  );
};

export default ProfileCard;
