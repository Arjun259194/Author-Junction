import ErrorPage from "@/components/ErrorPage"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Meta from "@/components/Meta"
import AuthorMedia from "@/components/Profile/AuthorMedia"
import ReaderMedia from "@/components/Profile/ReaderMedia"
import UserProfile from "@/components/Profile/UserProfile"
import UserModel, { User } from "@/database/model/User"
import connectDB from "@/utils/api/connectDB"
import { getUserIdFromToken } from "@/utils/api/functions"
import { isValidObjectId } from "mongoose"
import { GetServerSideProps, NextPage } from "next"
import { Head } from "next/document"
import Link from "next/link"

interface Props
  extends Pick<User, "role" | "username" | "email" | "following" | "followers"> {
  id: string
}

const UserProfilePage: NextPage<Props> = props => {
  if (!props) return <ErrorPage />

  console.log(props)
  const { username, email, followers, following, role, id } = props
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-tr from-violet-300 to-cyan-300">
      <Meta title={`${username} - ${email}`} />
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
          <ReaderMedia userId={id} />
        ) : (
          <AuthorMedia userId={id} />
        )}
      </main>
      <Footer className="mt-auto text-gray-600" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  await connectDB()
  const token = context.req.cookies.accessToken
  const userId = getUserIdFromToken(token)
  if (!userId)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    } as any

  const queryId = context.query.id

  let id: string
  if (!queryId || !isValidObjectId(queryId)) return { props: {} }

  if (typeof queryId === "string") id = queryId
  else id = queryId[0]

  if(userId === id) return {
    redirect: {
        destination: "/user/profile"
    }
  }

  const user = await UserModel.findById<User>(id).exec()
  if (!user) return { props: {} }

  return {
    props: {
      id: user.id,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      role: user.role,
    },
  }
}

export default UserProfilePage
