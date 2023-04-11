import { authorIcon, readerIcon } from "@/assets/icons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserModel, { userZSchema as ZodUser } from "@/database/model/User";
import { getUserIdFromCookie } from "@/utils/api/functions";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import z from "zod";

const zodProfileData = ZodUser.omit({
  password: true,
});

type Data = z.infer<typeof zodProfileData>;

interface Props {
  data: Data | null;
}

export const Profile: NextPage<Props> = ({ data }) => {
  if (!data)
    return (
      <div>
        <span>oops!</span>
        <h1>Something went wrong!</h1>
      </div>
    );

  const { email, followers, following, role, username } = data;

  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <Header className="bg-gray-100" />
      <main className="bg-gray-50">
        <section className="flex flex-col items-center text-gray-900">
          <div className="flex flex-col items-center">
            <span className="block aspect-square h-20 text-gray-800">
              {role === "READER" ? readerIcon : authorIcon}
            </span>
            <h2 className="text-5xl font-semibold capitalize ">{username}</h2>
            <span className="text-2xl font-semibold text-gray-700">
              Hey! {role === "READER" ? "Reader" : "Author"}
            </span>
            <span className="text-sm text-gray-500">{email}</span>
          </div>
          <div className="my-2 flex w-1/5 items-center justify-around space-x-2 capitalize">
            <div className="flex w-1/2 justify-around rounded-md bg-gray-200 p-2">
              <span>Follower</span>
              <span>{followers.length}</span>
            </div>
            <div className="flex w-1/2 justify-around rounded-md bg-gray-200 p-2">
              <span>following</span>
              <span>{following.length}</span>
            </div>
          </div>
        </section>
      </main>
      <Footer className="bg-gray-100" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = context.req.cookies["accessToken"];
  const userId = getUserIdFromCookie(token);
  if (!userId)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  const user = await UserModel.findById(userId).exec();

  const parsedUser = zodProfileData.safeParse(user);

  if (!parsedUser.success)
    return {
      props: {
        data: null,
      },
    };

  return {
    props: {
      data: parsedUser.data,
    },
  };
};

export default Profile;
