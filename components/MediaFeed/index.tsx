import Button from "@/UI/Button";
import { authorIcon, loadingIcon } from "@/assets/icons";
import { Post } from "@/database/model/Post";
import { HTMLElementProps } from "@/utils/types";
import { FC, ReactNode } from "react";
import Posts from "./Posts";

interface Props extends HTMLElementProps {
  userId: string;
  posts: Post[];
  loading: boolean;
  fetchFunction: () => void;
  children: ReactNode;
}

const MediaFeed: FC<Props> = ({
  children,
  className,
  userId,
  fetchFunction,
  loading,
  posts,
  ...props
}) => {
  if (loading)
    return (
      <section className="flex w-full items-center justify-center">
        <span className="aspect-square h-10 animate-spin">{loadingIcon}</span>
      </section>
    );

  if (posts.length <= 0)
    return (
      <section className="flex w-full flex-col items-center justify-center space-y-2 ">
        <h1 className="text-2xl font-semibold ">No Feed available</h1>
        <p>There are not post</p>
        {
          //todo: add "create-page" link to this button
        }
        <Button variant="primary" className=" flex items-center space-x-2 ">
          <span className="aspect-square h-5">{authorIcon}</span>
          <span>Create Post</span>
        </Button>
        <p>or you can try to refresh</p>
        <Button
          onClick={_ => {
            window.location.reload();
          }}
          className="capitalize"
          variant="secondary"
        >
          refresh
        </Button>
      </section>
    );

  return (
    <section {...props} className={` ${className} scrollbar-hide w-full overflow-y-scroll`}>
      <div className="flex items-center justify-center space-x-2 py-1">
        <h2 className=" flex items-center text-center text-4xl font-semibold capitalize text-gray-900">
          {children}
        </h2>
      </div>
      <Posts fetchData={fetchFunction} userId={userId} posts={posts} />
    </section>
  );
};

export default MediaFeed;
