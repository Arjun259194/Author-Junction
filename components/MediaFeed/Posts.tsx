import Button from "@/UI/Button";
import { User } from "@/database/model/User";
import { FC } from "react";
import Post from "./Post";

interface Props {
  posts: Post[];
  user: User;
  fetchData: () => void;
}

const Posts: FC<Props> = ({ posts, fetchData, user }) => {
  return (
    <>
      <div className=" mx-auto max-h-full w-10/12 ">
        <div className="flex w-full justify-center">
          <Button onClick={fetchData} className="my-2" variant="secondary">
            Refresh
          </Button>
        </div>
        <div>
          {posts.map((post, index) => {
            return <Post key={index} user={user} post={post} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Posts;
