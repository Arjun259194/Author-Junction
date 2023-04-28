import { FC } from "react"
import LoadingPost from "./LoadingPost"

const LoadingPosts: FC = () => {
  return (
    <div className=" mx-auto max-h-full w-11/12 py-10 ">
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
    </div>
  )
}

export default LoadingPosts
