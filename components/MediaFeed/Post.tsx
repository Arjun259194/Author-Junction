import { likeIcon, likedIcon, saveIcon, shareIcon } from "@/assets/icons";
import { Post } from "@/database/model/Post";
import API from "@/utils/apiClient";
import { FC, MouseEventHandler, useState } from "react";
import PostButton from "./PostButton";

interface Props {
  post: Post;
  userId: string;
}

const shortenString = (str: string): string => str.substring(0, 250) + "...";

const Post: FC<Props> = ({ post, userId }) => {
  console.log("This is post:", post);
  console.log("this is like", post.likes);
  console.log("this is userId", userId);
  const [liked, setLiked] = useState<boolean>(post.likes.includes(userId));
  console.log("This is liked state:", liked);
  const apiClient = new API();

  const likeToggle: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault();
    const res = await apiClient.likePost(post._id);
    if (res.ok) setLiked(!liked);
  };

  return (
    <article className="mx-3 mb-6 min-w-min space-y-2 rounded-md border-2 border-gray-200 bg-gray-50 p-2 text-gray-900 shadow-md transition-all duration-200">
      <a href={`/post/${post._id}`}>
        <h3 className="rounded-lg p-1 text-2xl font-semibold text-gray-900 hover:text-blue-600 hover:underline">
          {post.title}
        </h3>
      </a>
      <hr />
      <p className="p-1 text-base leading-relaxed text-gray-700">{shortenString(post.content)}</p>
      <hr />
      <div className="flex w-full justify-around text-xl capitalize">
        <PostButton onClick={likeToggle} className="hover:bg-pink-50">
          <span className=" aspect-square h-6 transition-colors duration-200 group-hover:text-pink-500">
            {liked ? likedIcon : likeIcon}
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
    </article>
  );
};

export default Post;
