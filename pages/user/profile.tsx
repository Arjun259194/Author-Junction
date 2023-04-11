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
      <div className="flex flex-col">
        <span>{username}</span>
        <span>{email}</span>
        <span>{followers.length}</span>
        <span>{following.length}</span>
        <span>{role}</span>
      </div>
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
