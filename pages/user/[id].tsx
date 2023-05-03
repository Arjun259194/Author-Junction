import Button from "@/UI/Button"
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
import API from "@/utils/apiClient"
import { isValidObjectId } from "mongoose"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { MouseEventHandler, useState } from "react"

interface Props extends Pick<User, "role" | "username" | "email" | "following" | "followers"> {
  id: string
  clientUserId: string
}

const UserProfilePage: NextPage<Props> = props => {
  const { username, email, followers, following, role, id, clientUserId } = props

  const [isFollowed, setIsFollowed] = useState<boolean>(followers.includes(clientUserId))
  const apiClient = new API()

  const onFollowHandler: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault()
    const res = await apiClient.followUser(id)
    if (res.ok) {
      setIsFollowed(!isFollowed)
    }
  }

  if (!props) return <ErrorPage />

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
        <li className="">
          <Link href="/media">media</Link>
        </li>
      </Header>
      <main className="">
        <UserProfile user={{ username, email, followers, following, role }} />
        <div className="mx-auto flex w-10/12 justify-center">
          <Button
            variant={`${isFollowed ? "secondary" : "primary"}`}
            className={`${
              isFollowed
                ? "hover:border-red-500 hover:bg-red-500 hover:text-white"
                : "hover:border-cyan-600 hover:bg-cyan-600 hover:text-white"
            } mt-5 text-xl`}
            onClick={onFollowHandler}
          >
            {isFollowed ? "unfollow" : "follow"}
          </Button>
        </div>
        {role === "READER" ? (
          <ReaderMedia userId={id} />
        ) : (
          <AuthorMedia fetchUserId={id} userId={clientUserId} />
        )}
      </main>
      <Footer className="mt-auto" />
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

  if (userId === id)
    return {
      redirect: {
        destination: "/user/profile",
      },
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
      clientUserId: userId,
    },
  }
}

export default UserProfilePage
