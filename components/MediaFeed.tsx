import Button from "@/UI/Button";
import { authorIcon } from "@/assets/icons";
import { Post } from "@/database/model/Post";
import API from "@/utils/apiClient";
import { FC, useEffect, useState } from "react";
import Posts from "./Posts";

const MediaFeed: FC = () => {
  const api = new API();
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    api
      .getPosts()
      .then(res => (res.status === 404 ? null : res.json()))
      .then(data => setPosts(data))
      .catch(err => {
        console.log(err);
        setPosts([]);
      });
  }, []);

  if (posts.length === 0)
    return (
      <section className="flex w-full flex-col items-center justify-center space-y-2">
        <h1 className="text-2xl font-semibold">No Feed available</h1>
        <p>Use this opportunity and create some posts and share your work</p>
        <Button variant="primary" className=" flex items-center space-x-2 ">
          <span>Create Post</span>
          <span>{authorIcon}</span>
        </Button>
        <p>or you can try to refresh</p>
        <Button
          onClick={_ => {
            window.location.reload();
          }}
          className="capitalize"
          variant="secondary">
          refresh
        </Button>
      </section>
    );

  return (
    <section className="w-full">
      <div>
        <h2 className="text-center text-3xl font-semibold capitalize text-gray-100">latest feed</h2>
      </div>
      <Posts posts={posts} />
    </section>
  );
};

export default MediaFeed;
