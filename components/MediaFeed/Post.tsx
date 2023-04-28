import { deleteIcon, likeIcon, likedIcon } from "@/assets/icons"
import { motion } from "framer-motion"
import { Post } from "@/database/model/Post"
import API from "@/utils/apiClient"
import { FC, MouseEventHandler, useState } from "react"
import PostButton from "./PostButton"
import ShareButton from "./ShareButton"

interface Props {
  post: FullPost
  userId: string
  index: number
}

interface FullPost extends Omit<Post, "creator"> {
  creator: {
    username: string
    _id: string
  }
}

const shortenString = (str: string): string => str.substring(0, 250) + "..."

const Post: FC<Props> = ({ post, userId, index }) => {
  const apiClient = new API()
  const [liked, setLiked] = useState<boolean>(post.likes.includes(userId))

  const likeToggle: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault()
    const res = await apiClient.likePost(post._id)
    if (res.ok) setLiked(!liked)
  }

  const deletePost: MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault()
    apiClient.deletePost(post._id).then(res => {
      if (res.ok) {
        window.location.reload()
      }
    }).catch(err => console.error(err))
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 0.4 * (index + 1),
        delay: 0.1 * (index + 1),
        ease: "easeInOut"
      }}
    >
      <article className="mx-3 mb-6 min-w-min space-y-2 rounded-md border-2 border-gray-200 bg-gray-50 p-2 text-gray-900 shadow-md transition-all duration-200">
        <a href={`/user/${post.creator._id}`}>
          <h4 className="text-xl font-semibold capitalize text-gray-600 hover:text-violet-500 hover:underline">
            {post.creator.username}
          </h4>
        </a>
        <a href={`/post/${post._id}`}>
          <h3 className="rounded-lg p-1 text-2xl font-semibold text-gray-900 hover:text-cyan-600 hover:underline">
            {post.title}
          </h3>
        </a>
        <hr />
        <p className="p-1 text-base leading-relaxed text-gray-700">
          {shortenString(post.description)}
        </p>
        <hr />
        <div className="flex w-full justify-evenly text-xl capitalize">
          <PostButton onClick={likeToggle} className="hover:bg-pink-50">
            <span
              className={` aspect-square h-6 transition-colors ${!!liked ? "text-pink-500" : ""
                } duration-200 group-hover:text-pink-500`}
            >
              {liked ? likedIcon : likeIcon}
            </span>
            <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-pink-500">
              like
            </span>
          </PostButton>
          <ShareButton postId={post._id} />
          {post.creator._id === userId ? (
            <PostButton onClick={deletePost} className="hover:bg-red-50">
              <span
                className={` aspect-square h-6 transition-colors duration-200 group-hover:text-red-500`}
              >
                {deleteIcon}
              </span>
              <span className=" text-base capitalize text-gray-500 transition-colors duration-200 group-hover:text-red-500">
                delete
              </span>
            </PostButton>
          ) : null}
        </div>
      </article>
    </motion.div>
  )
}

export default Post
