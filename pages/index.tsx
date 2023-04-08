import Header from "@/components/Header";
import MediaFeed from "@/components/MediaFeed";
import Sidebar from "@/components/Sidebar";
import UserModel, { User } from "@/database/model/User";
import connectDB from "@/utils/api/connectDB";
import { JwtPayload, decode } from "jsonwebtoken";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface PageProps {
  userData: string;
}

const Home: NextPage<PageProps> = ({ userData }) => {
  const user: User = JSON.parse(userData);
  return (
    <div className="bg-gray-900">
      <Head>
        <title>{`Home | ${user.username}`}</title>
        <meta name="description" content="Author-Junction Home feed page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="flex">
        <Sidebar user={user} />
        <MediaFeed />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
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
