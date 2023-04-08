import { FC } from "react";
import Post from "./Post";

interface Props {
  posts: Post[];
}

const Posts: FC<Props> = ({ posts }) => {
  return (
    <div className="scrollbar-hide max-h-screen overflow-scroll ">
      {posts.map(post => {
        return <Post post={post} />;
      })}
    </div>
  );
};

export default Posts;
