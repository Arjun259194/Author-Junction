import { likeIcon, likedIcon, shareIcon } from "@/assets/icons";
import { Post } from "@/database/model/Post";
import { User } from "@/database/model/User";
import { FC } from "react";
import PostButton from "./PostButton";

interface Props {
  post: Post;
  user: User;
}

const Post: FC<Props> = ({ post, user }) => {
  return (
    <article className="mx-3 mb-3 min-w-min space-y-2 rounded-xl border border-gray-300 bg-gray-200 p-2 text-gray-900 shadow-md transition-all duration-200 hover:shadow-lg ">
      <h3 className="rounded-lg p-1 text-3xl">{post.title}</h3>
      <p className="p-1 text-lg leading-relaxed">{post.content}</p>
      <div className="flex space-x-4 text-xl capitalize">
        <PostButton>
          <span className=" aspect-square h-6 transition-colors duration-200 group-hover:text-pink-500">
            {post.likes.filter(likeId => user._id === likeId).length === 0 ? likeIcon : likedIcon}
          </span>
          <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-pink-500">
            like
          </span>
        </PostButton>
        <PostButton>
          <span className=" aspect-square h-6 transition-colors duration-200 group-hover:text-blue-500">
            {shareIcon}
          </span>
          <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-blue-500">
            share
          </span>
        </PostButton>
      </div>
    </article>
  );
};

export default Post;
