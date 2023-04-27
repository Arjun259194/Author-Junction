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

type Props = {
  following: Pick<User, "id" | "username" | "email">[]
}

const following: NextPage<Props> = props => {
  return (
    <div>
      <Head>
        <title>Following</title>
      </Head>
      <Header />
      <main className="w-11/12 mx-auto">
        <SecTitle>
          People you follow
        </SecTitle>
        <div>
          {props.following.map(v => <UserCard user={v} />)}
        </div>
      </main>
      <Footer />
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

  console.log(followingUser)
  return {
    props: {
      following: followingUser.map(v => {
        return {
          id: v.id,
          username: v.username,
          email: v.email,
        }
      }),
    },
  }
}

export default following
