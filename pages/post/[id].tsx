import { likedIcon, likeIcon } from "@/assets/icons"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import PostButton from "@/components/MediaFeed/PostButton"
import ShareButton from "@/components/MediaFeed/ShareButton"
import PostModel, { Post } from "@/database/model/Post"
import Paragraph from "@/UI/Paragraph"
import Title from "@/UI/Title"
import { getUserIdFromToken } from "@/utils/api/functions"
import API from "@/utils/apiClient"
import { isValidObjectId } from "mongoose"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import { MouseEventHandler, useState } from "react"

interface PageProps {
  userId: string
  title: string
  description: string
  content: string
  id: string
  likes: string[]
  creator: {
    id: string
    username: string
    email: string
  }
}

interface FullPost extends Omit<Post, "creator"> {
  creator: {
    id: string
    username: string
    email: string
  }
}

const PostPage: NextPage<PageProps> = props => {
  if (!props) return <div>can't get this post</div>
  console.log(props.content)
  const [liked, setLiked] = useState<boolean>(props.likes.includes(props.userId))
  const apiClient = new API()
  const likeToggle: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault()
    const res = await apiClient.likePost(props.id)
    if (res.ok) setLiked(!liked)
  }
  return (
    <div className="bg-gradient-to-br from-cyan-300 to-violet-300">
      <Head>
        <title>postPage</title>
      </Head>
      <Header />
      <main className="mx-auto min-h-screen w-10/12 space-y-6">
        <Title>{props.title}</Title>
        <div className="flex w-full justify-between">
          <span className="font-semibold capitalize text-gray-700">
            written by: {props.creator.username}
          </span>
          <span className="font-semibold capitalize text-gray-700">
            email: {props.creator.email}
          </span>
        </div>
        <p className=" text-base leading-snug text-gray-700">
          <q>{props.description}</q>
        </p>
        <div>
          {props.content
            .split("\n\n")
            .filter(Boolean)
            .map(p => (
              <Paragraph className="my-2">{p}</Paragraph>
            ))}
        </div>
        <div className="flex w-full justify-evenly text-xl capitalize">
          <PostButton onClick={likeToggle} className="hover:bg-pink-50">
            <span className=" aspect-square h-6 transition-colors duration-200 group-hover:text-pink-500">
              {liked ? likedIcon : likeIcon}
            </span>
            <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-pink-500">
              like
            </span>
          </PostButton>
          <ShareButton postId={props.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async context => {
  const token = context.req.cookies.accessToken

  const userId = getUserIdFromToken(token)

  //redirecting user
  if (!userId)
    return { redirect: { destination: "/auth/login", permanent: false } } as any

  const postId = context.query.id

  if (!isValidObjectId(postId)) {
    return { props: {} }
  }

  const post = await PostModel.findById<FullPost>(postId).populate("creator")

  if (!post)
    return {
      props: {},
    }

  console.log(post?.creator)
  return {
    props: {
      userId: userId,
      id: post.id,
      content: post.content,
      description: post.description,
      title: post.title,
      likes: post.likes,
      creator: {
        id: post.creator.id,
        username: post.creator.username,
        email: post.creator.email,
      },
    },
  }
}

export default PostPage
