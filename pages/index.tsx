import { authorIcon, readerIcon } from "@/assets/icons";
import Header from "@/components/Header";
import LogoutButton from "@/components/LogoutButton";
import { Post } from "@/database/model/Post";
import UserModel, { User } from "@/database/model/User";
import connectDB from "@/utils/api/connectDB";
import API from "@/utils/apiClient";
import { JwtPayload, decode } from "jsonwebtoken";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

interface PageProps {
  userData: string;
}

const Home: NextPage<PageProps> = ({ userData }) => {
  const user: User = JSON.parse(userData);
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
  return (
    <div className=" bg-gray-900 text-gray-100">
      <Head>
        <title>{`Home | ${user.username}`}</title>
        <meta
          name="description"
          content="Author-Junction Home feed page"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Header />
      <main className="grid grid-cols-4">
        <section className="">
          <div className="mx-2 my-1 bg-gray-800 p-2">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <span className="flex">
              Role:
              <span className="aspect-square h-6">
                {user.role === "READER"
                  ? readerIcon
                  : authorIcon}
              </span>
            </span>
            <p>Followers: {user.followers.length}</p>
            <p>Following: {user.following.length}</p>
          </div>
          <div>
            <LogoutButton />
          </div>
        </section>
        <section className="scrollbar-hide col-span-3 max-h-screen overflow-scroll">
          {posts.map(post => {
            return (
              <article className="my-4 mx-auto w-11/12 bg-gray-800 p-3">
                <h3 className="py-2 text-xl">
                  {post.title}
                </h3>
                <p>{post.content}</p>
                <div className="flex space-x-4 text-xl">
                  <span>like {post.likes}</span>
                  <span>share {post.shares}</span>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  PageProps
> = async context => {
  await connectDB();
  const token = context.req.cookies.accessToken;
  if (!token)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  const payLoad = decode(token) as JwtPayload;
  const user = await UserModel.findById(payLoad.id).exec();
  return { props: { userData: JSON.stringify(user) } };
};

export default Home;
