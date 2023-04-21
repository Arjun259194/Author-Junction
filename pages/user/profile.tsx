import ErrorPage from "@/components/ErrorPage"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import AuthorMedia from "@/components/Profile/AuthorMedia"
import ReaderMedia from "@/components/Profile/ReaderMedia"
import UserProfile from "@/components/Profile/UserProfile"
import UserModel, { User } from "@/database/model/User"
import connectDB from "@/utils/api/connectDB"
import { getUserIdFromToken } from "@/utils/api/functions"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

interface Props {
  user: string
}

export const Profile: NextPage<Props> = ({ user }) => {
  const userData: User | null = JSON.parse(user)

  if (!userData) return <ErrorPage />

  const { email, followers, following, role, username, _id } = userData

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-tr from-violet-300 to-cyan-300">
      <Head>
        <title>Profile</title>
      </Head>
      <Header className="text-lg text-gray-900">
        <li className="">
          <Link href="/">home</Link>
        </li>
        <li className="">
          <Link href="/about">about</Link>
        </li>
      </Header>
      <main className="">
        <UserProfile user={{ username, email, followers, following, role }} />
        {role === "READER" ? (
          <ReaderMedia userId={_id} />
        ) : (
          <AuthorMedia userId={_id} />
        )}
      </main>
      <Footer className="mt-auto text-gray-600" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  await connectDB()
  const token = context.req.cookies["accessToken"]
  const userId = getUserIdFromToken(token)
  if (!userId)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }

  const user = await UserModel.findById<User>(userId).exec()

  return {
    props: {
      user: JSON.stringify(user),
    },
  }
}

export default Profile
