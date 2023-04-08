import Button from "@/UI/Button";
import { authorIcon, readerIcon } from "@/assets/icons";
import { User } from "@/database/model/User";
import { default as API } from "@/utils/apiClient";
import { FC, MouseEventHandler } from "react";

interface Props {
  user: User;
}

const Sidebar: FC<Props> = ({ user }) => {
  const apiClient = new API();
  const logoutHandler: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault();
    apiClient
      .logoutUser()
      .then(_ => {
        window.location.reload();
      })
      .catch(err => {
        console.log("Logging out failed");
        console.log(err);
      });
  };
  return (
    <section className=" flex min-h-screen w-1/4 min-w-max max-w-xs flex-col justify-between rounded-r-2xl p-4 text-gray-900">
      <div className="rounded-lg bg-gray-800 p-2 ">
        <div className="flex items-center">
          <h3 className=" text-3xl font-bold capitalize text-gray-100">{user.username}</h3>
          <span className="group relative mx-2 aspect-square h-6 text-gray-100">
            {user.role === "READER" ? readerIcon : authorIcon}
            <span className="absolute top-0 left-full mx-2 scale-0 rounded bg-gray-200 p-1 font-semibold opacity-0 transition-transform group-hover:scale-100 group-hover:opacity-100">
              {user.role === "READER" ? "Reader" : "Author"}
            </span>
          </span>
        </div>
        <p className="text-gray-400">{user.email}</p>
        <div className="my-2 flex flex-col space-y-3 text-lg">
          <Button className="py-1 capitalize" variant="primary">
            my profile
          </Button>
          <Button className="py-1 capitalize" variant="secondary">
            logout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
