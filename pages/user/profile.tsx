import ErrorPage from "@/components/ErrorPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AuthorMedia from "@/components/Profile/AuthorMedia";
import ReaderMedia from "@/components/Profile/ReaderMedia";
import UserProfile from "@/components/Profile/UserProfile";
import UserModel, { User } from "@/database/model/User";
import { getUserIdFromToken } from "@/utils/api/functions";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface Props {
  user: string;
}

export const Profile: NextPage<Props> = ({ user }) => {
  const userData: User | null = JSON.parse(user);

  if (!userData) return <ErrorPage />;

  const { email, followers, following, role, username, _id } = userData;

  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <Header className="bg-gray-100" />
      <main className="bg-gray-50">
        <UserProfile user={{ username, email, followers, following, role }} />
        {role === "READER" ? <ReaderMedia userId={userData._id} /> : <AuthorMedia />}
      </main>
      <Footer className="bg-gray-100" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = context.req.cookies["accessToken"];
  const userId = getUserIdFromToken(token);
  if (!userId)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  const user = await UserModel.findById<User>(userId).exec();

  return {
    props: {
      user: JSON.stringify(user),
    },
  };
};

export default Profile;
