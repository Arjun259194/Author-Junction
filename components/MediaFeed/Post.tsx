import { likeIcon, likedIcon, saveIcon, shareIcon } from "@/assets/icons";
import { Post } from "@/database/model/Post";
import { User } from "@/database/model/User";
import { FC } from "react";
import PostButton from "./PostButton";

interface Props {
  post: Post;
  user: User;
}

const shortenString = (str: string): string => str.substring(0, 300) + "...";

const Post: FC<Props> = ({ post, user }) => {
  return (
    <article className="mx-3 mb-6 min-w-min space-y-2 rounded-md border-2 border-gray-200 bg-gray-50 p-2 text-gray-900 shadow-md transition-all duration-200">
      <h3 className="rounded-lg p-1 text-2xl font-semibold text-gray-900">{post.title}</h3>
      <hr />
      <p className="p-1 text-base leading-relaxed text-gray-700">{shortenString(post.content)}</p>
      <hr />
      <div className="flex w-full justify-around text-xl capitalize">
        <PostButton className="hover:bg-pink-50">
          <span className=" aspect-square h-6 transition-colors duration-200 group-hover:text-pink-500">
            {post.likes.filter(likeId => user._id === likeId).length === 0 ? likeIcon : likedIcon}
          </span>
          <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-pink-500">
            like
          </span>
        </PostButton>
        <PostButton className="hover:bg-blue-50">
          <span className=" aspect-square h-6 transition-colors duration-200 group-hover:text-blue-500">
            {shareIcon}
          </span>
          <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-blue-500">
            share
          </span>
        </PostButton>
        <PostButton className="hover:text-green-50">
          <span className=" aspect-square h-6 transition-colors duration-200 group-hover:text-green-500">
            {saveIcon}
          </span>
          <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-green-500">
            save
          </span>
        </PostButton>
      </div>
      <h1>{post._id}</h1>
    </article>
  );
};

export default Post;