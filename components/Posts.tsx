import { User } from "@/database/model/User";
import { FC } from "react";
import Post from "./Post";

interface Props {
  posts: Post[];
  user: User;
}

const Posts: FC<Props> = ({ posts, user }) => {
  return (
    <div className="scrollbar-hide max-h-full ">
      {posts.map(post => {
        return <Post user={user} post={post} />;
      })}
    </div>
  );
};

export default Posts;
