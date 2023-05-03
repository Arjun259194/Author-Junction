import Button from "@/UI/Button"
import Paragraph from "@/UI/Paragraph"
import SecTitle from "@/UI/SecTitle"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import UserCard from "@/components/UserCard"
import UserModel from "@/database/model/User"
import { User } from "@/database/model/User"
import connectDB from "@/utils/api/connectDB"
import { getUserIdFromToken } from "@/utils/api/functions"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

type Props = {
  following: Pick<User, "id" | "username" | "email" | "following" | "followers">[]
}

const following: NextPage<Props> = props => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-tr from-violet-400 to-cyan-400">
      <Head>
        <title>Following</title>
      </Head>
      <Header>
        <li className="">
          <Link href="/about">about</Link>
        </li>
        <li className="">
          <Link href="/media">media</Link>
        </li>
        <li className="">
          <Link href={`/user/profile`}>profile</Link>
        </li>
      </Header>
      <main className="mx-auto w-10/12 space-y-2">
        {props.following.length <= 0 ? (
          <div className="flex flex-col items-center space-y-2 py-20 text-center">
            <SecTitle>You haven&apos;t followed anyone</SecTitle>
            <Paragraph>Find authors to follow</Paragraph>
            <Link href={`/media`}>
              <Button variant="primary">Media</Button>
            </Link>
          </div>
        ) : (
          <>
            <SecTitle>People you follow</SecTitle>
            <div className="grid grid-cols-2 gap-6 py-4">
              {props.following.map((v, i) => (
                <UserCard key={i} user={v} />
              ))}
            </div>
          </>
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

  const user = await UserModel.findById<User>(userId).exec()

  if (!user) return { props: { following: [] } }

  const followingUser = await UserModel.find<User>({
    _id: {
      $in: user.following,
    },
  }).exec()

  if (!followingUser || followingUser.length <= 0) return { props: { following: [] } }

  return {
    props: {
      following: followingUser.map(v => {
        return {
          username: v.username,
          email: v.email,
          id: v.id,
          followers: v.followers,
          following: v.following,
        }
      }),
    },
  }
}

export default following
