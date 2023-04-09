import Button from "@/UI/Button";
import { authorIcon, loadingIcon, newsIcon } from "@/assets/icons";
import { Post } from "@/database/model/Post";
import { User } from "@/database/model/User";
import API from "@/utils/apiClient";
import { FC, useEffect, useState } from "react";
import Posts from "./Posts";

interface Props {
  user: User;
}

const MediaFeed: FC<Props> = ({ user }) => {
  const api = new API();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = () => {
    setLoading(true);
    api
      .getPosts()
      .then(res => (res.status === 404 ? null : res.json()))
      .then(data => {
        setLoading(false);
        return !!data ? setPosts(data) : null;
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        setPosts([]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <p>Use this opportunity and create some posts and share your work</p>
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
    <section className="scrollbar-hide max-h-full w-full overflow-y-scroll">
      <div className="flex items-center justify-center space-x-2 py-1">
        <span className="aspect-square h-8">{newsIcon}</span>
        <h2 className=" text-center text-4xl font-semibold capitalize text-gray-900">
          latest feed
        </h2>
      </div>
      <Posts fetchData={fetchData} user={user} posts={posts} />
    </section>
  );
};

export default MediaFeed;
