import { likeIcon, shareIcon } from "@/assets/icons";
import { Post } from "@/database/model/Post";
import { FC } from "react";

interface Props {
  post: Post;
}

const Post: FC<Props> = ({ post }) => {
  return (
    <article className="my-4 mx-auto w-3/4 min-w-min space-y-2 rounded-md bg-gray-800 p-2 text-gray-100">
      <h3 className="rounded-lg p-1 text-2xl">{post.title}</h3>
      <p className="p-1 leading-relaxed">{post.content}</p>
      <div className="flex space-x-4 text-xl capitalize">
        <button className="group flex items-center space-x-2 rounded-lg px-2 py-1 hover:bg-gray-900">
          <span className="group-hover:text-pink-500">{likeIcon}</span>
          <span className="text-base text-gray-500">{post.likes.length}</span>
        </button>
        <button className="group flex items-center space-x-2 rounded-lg px-2 py-1 hover:bg-gray-900">
          <span className="group-hover:text-blue-500">{shareIcon}</span>
          <span className="text-base text-gray-500">{post.shares}</span>
        </button>
      </div>
    </article>
  );
};

export default Post;
