import Button from "@/UI/Button";
import { logoutIcon, profileIcon } from "@/assets/icons";
import { User } from "@/database/model/User";
import { default as API } from "@/utils/apiClient";
import { FC, MouseEventHandler } from "react";
import SidebarNavbar from "./NavCard";
import ProfileCard from "./ProfileCard";

interface Props {
  user: User;
}

const Sidebar: FC<Props> = ({ user: { username, email, role } }) => {
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
    <aside className=" flex max-h-full w-1/6 min-w-min flex-col justify-between bg-blue-300 p-2 text-gray-900">
      <div className="space-y-4">
        <ProfileCard username={username} email={email} role={role} />
        <hr />
        <SidebarNavbar />
      </div>
      <div className="my-2 flex flex-col space-y-3 text-lg">
        <hr />
        <Button
          className="flex items-center justify-start space-x-2 py-1 text-base font-semibold capitalize"
          variant="primary"
        >
          <span className="aspect-square h-8">{profileIcon}</span>
          <span>my profile</span>
        </Button>
        <Button
          onClick={logoutHandler}
          className="flex items-center justify-start space-x-2 py-1 text-base font-semibold capitalize"
          variant="secondary"
        >
          <span className="aspect-square h-8">{logoutIcon}</span>
          <span>logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
