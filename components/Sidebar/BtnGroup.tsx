import Button from "@/UI/Button"
import { authorIcon, logoutIcon, profileIcon } from "@/assets/icons"
import API from "@/utils/apiClient"
import { MouseEventHandler } from "react"

const BtnGroup = () => {
  const apiClient = new API()
  const logoutHandler: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault()
    apiClient
      .logoutUser()
      .then(_ => {
        window.location.reload()
      })
      .catch(err => {
        console.log("Logging out failed")
        console.log(err)
      })
  }
  return (
    <div className="my-2 flex flex-col space-y-3 text-lg">
      <hr />
      <Button
        className="flex items-center justify-start space-x-2 py-1 text-base font-semibold capitalize"
        variant="primary"
        onClick={event => {
          event.preventDefault()
          window.location.href = "/user/profile"
        }}
      >
        <span className="aspect-square h-8">{profileIcon}</span>
        <span>my profile</span>
      </Button>
      <Button
        onClick={() => (window.location.href = "/post/create")}
        variant="secondary"
        className=" flex items-center space-x-2 "
      >
        <span className="aspect-square h-5">{authorIcon}</span>
        <span>Create Post</span>
      </Button>
      <Button
        onClick={logoutHandler}
        className="flex items-center justify-start space-x-2 py-1 text-base font-semibold capitalize  hover:bg-red-500 hover:text-gray-100"
        variant="secondary"
      >
        <span className="aspect-square h-8">{logoutIcon}</span>
        <span>logout</span>
      </Button>
    </div>
  )
}

export default BtnGroup
