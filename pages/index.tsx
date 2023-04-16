import { newsIcon } from "@/assets/icons"
import MediaFeed from "@/components/MediaFeed"
import Sidebar from "@/components/Sidebar"
import Statusbar from "@/components/Statusbar"
import { Post } from "@/database/model/Post"
import UserModel, { User } from "@/database/model/User"
import connectDB from "@/utils/api/connectDB"
import API from "@/utils/apiClient"
import { JwtPayload, decode } from "jsonwebtoken"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"

interface PageProps {
  userData: string
}

const Home: NextPage<PageProps> = ({ userData }) => {
  const user: User = JSON.parse(userData)
  const api = new API()
  const [posts, setPosts] = useState<Array<Post>>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = () => {
    setLoading(true)
    api
      .getPosts()
      .then(res => (res.status === 404 ? null : res.json()))
      .then(data => {
        setLoading(false)
        return !!data ? setPosts(data) : null
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        setPosts([])
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bg-gradient-to-r from-violet-400 to-cyan-400">
      <Head>
        <title>{`Home | ${user.username}`}</title>
        <meta name="description" content="Author-Junction Home feed page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex h-screen py-2">
        <Sidebar user={user} />
        <MediaFeed
          className="rounded  py-5"
          fetchFunction={fetchData}
          loading={loading}
          posts={posts}
          userId={user._id}
        >
          <span className="block aspect-square h-8">{newsIcon}</span>
          <span>Latest feed</span>
        </MediaFeed>
        <Statusbar />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  await connectDB()
  const token = context.req.cookies.accessToken
  if (!token)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }
  const payLoad = decode(token) as JwtPayload
  const user = await UserModel.findById(payLoad.id).exec()
  return { props: { userData: JSON.stringify(user) } }
}

export default Home
