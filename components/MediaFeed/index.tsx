import Button from "@/UI/Button"
import { authorIcon, loadingIcon } from "@/assets/icons"
import { Post } from "@/database/model/Post"
import { HTMLElementProps } from "@/utils/types"
import { FC, ReactNode } from "react"
import Posts from "./Posts"
import LoadingPosts from "./LoadingPosts"
import Title from "@/UI/Title"
import Paragraph from "@/UI/Paragraph"
import { motion } from "framer-motion"

interface Props extends HTMLElementProps {
  userId: string
  posts: FullPost[]
  loading: boolean
  fetchFunction: () => void
  children: ReactNode
}

interface FullPost extends Omit<Post, "creator"> {
  creator: {
    username: string
    _id: string
  }
}

const MediaFeed: FC<Props> = ({
  children,
  className,
  userId,
  fetchFunction,
  loading,
  posts,
  ...props
}) => {
  if (loading)
    return (
      <section className="flex w-full  flex-col items-center justify-center">
        <LoadingPosts />
      </section>
    )

  if (posts.length <= 0)
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: 0.2,
        }}
      >
        <section className="flex w-full flex-col items-center justify-center space-y-2 py-10 text-center ">
          <Title className="text-gray-800">No Feed available</Title>
          <Paragraph>There are no posts</Paragraph>
          <Button
            onClick={() => (window.location.href = "/post/create")}
            variant="primary"
            className=" flex items-center space-x-2 "
          >
            <span className="aspect-square h-6">{authorIcon}</span>
            <span className="text-lg">Create Post</span>
          </Button>
          <Paragraph>or you can try to refresh</Paragraph>
          <Button
            onClick={_ => {
              window.location.reload()
            }}
            className="text-lg"
            variant="secondary"
          >
            refresh
          </Button>
        </section>
      </motion.div>
    )

  return (
    <section {...props} className={` ${className} scrollbar-hide w-full overflow-y-scroll `}>
      <div className="flex items-center justify-center space-x-2 py-1">
        <h2 className=" flex items-center text-center text-4xl font-semibold capitalize text-gray-900">
          {children}
        </h2>
      </div>
      <Posts fetchData={fetchFunction} userId={userId} posts={posts} />
    </section>
  )
}

export default MediaFeed
