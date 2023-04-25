import { likedIcon, likeIcon } from "@/assets/icons"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import PostButton from "@/components/MediaFeed/PostButton"
import ShareButton from "@/components/MediaFeed/ShareButton"
import PostModel, { Post } from "@/database/model/Post"
import A from "@/UI/A"
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
    if (res.ok) {
      const index = props.likes.indexOf(props.userId)
      if (index !== -1) {
        props.likes.splice(index, 1)
      } else {
        props.likes.push(props.userId)
      }
      setLiked(!liked)
    }
  }
  return (
    <div className="bg-gradient-to-b from-cyan-400 to-violet-500">
      <Head>
        <title>postPage</title>
      </Head>
      <Header />
      <main className="mx-auto min-h-screen w-10/12 space-y-6 py-5">
        <div className="flex w-full justify-between">
          <span className="font-semibold capitalize text-gray-700">
            written by:{" "}
            <A href={`/user/${props.creator.id}`}>
              {props.creator.username}
            </A>
          </span>
          <span className="font-semibold text-gray-700">
            <span className="capitalize">email:</span> {props.creator.email} </span>
          <ShareButton postId={props.id} />
          <PostButton onClick={likeToggle}
            className={` aspect-square h-6 transition-colors ${!!liked ? "text-pink-500" : ""
              } duration-200 group-hover:text-pink-500`}>
            <span className=" aspect-square h-6 transition-colors duration-200 group-hover:text-pink-500">
              {liked ? likedIcon : likeIcon}
            </span>
            <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-pink-500">
              {props.likes.length}
            </span>
          </PostButton>
        </div>
        <Title>{props.title}</Title>
        <p className=" text-base leading-snug text-gray-700">
          <q>{props.description}</q>
        </p>
        <div className="space-y-4">
          {props.content
            .split("\n\n")
            .filter(Boolean)
            .map((p, i) => (
              <Paragraph key={i} className="">
                {p}
              </Paragraph>
            ))}
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
