import { FC } from "react";
import LoadingPost from "./LoadingPost";

const LoadingPosts: FC = () => {
  return (
    <div className=" mx-auto max-h-full py-10 w-11/12 ">
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
    </div>
  )
}

export default LoadingPosts;
