import { logoutIcon } from "@/assets/icons";
import API from "@/utils/apiClient";
import { ButtonHTMLAttributes, FC, MouseEventHandler, useState } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const LogoutButton: FC<ButtonProps> = props => {
  const [loading, setLoading] = useState<Boolean>(false);

  const apiClient = new API();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault();
    setLoading(true);
    apiClient
      .logoutUser()
      .then(_ => {
        setLoading(false);
        window.location.reload();
      })
      .catch(err => {
        console.log("Logging out failed");
        console.log(err);
      });
  };

  return (
    <button
      {...props}
      className="mx-2 flex space-x-2 bg-blue-400 px-4 py-2 "
      onClick={clickHandler}>
      {loading ? (
        "loading..."
      ) : (
        <>
          <span>Log out</span>
          <span className="h-full">{logoutIcon}</span>{" "}
        </>
      )}
    </button>
  );
};

export default LogoutButton;
