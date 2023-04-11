import PostModel, { Post } from "@/database/model/Post";
import { isValidObjectId } from "mongoose";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface PageProps {
  state: boolean;
  postData: string;
}

const PostPage: NextPage<PageProps> = ({ state, postData }) => {
  if (!state) return <div>id not valid</div>;

  const post: Post = JSON.parse(postData);
  return (
    <div>
      <Head>
        <title>postPage</title>
      </Head>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
      <span>{post._id}</span>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const token = context.req.cookies.accessToken;
  if (!token)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  const postId = context.query.id;

  if (!isValidObjectId(postId)) {
    return {
      props: {
        state: false,
        postData: "",
      },
    };
  }
  const post = await PostModel.findById(postId);
  return {
    props: {
      state: true,
      postData: JSON.stringify(post),
    },
  };
};

export default PostPage;
