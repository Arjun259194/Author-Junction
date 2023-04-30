import Button from "@/UI/Button"
import { FC } from "react"
import Post from "./Post"

interface FullPost extends Omit<Post, "creator"> {
  creator: {
    username: string
    _id: string
  }
}

interface Props {
  posts: FullPost[]
  userId: string
  fetchData: () => void
}

const Posts: FC<Props> = ({ posts, fetchData, userId }) => {
  return (
    <>
      <div className=" mx-auto max-h-full w-11/12 ">
        <div className="flex w-full justify-center">
          <Button onClick={fetchData} className="my-2" variant="secondary">
            Refresh
          </Button>
        </div>
        <div>
          {posts.map((post, index) => {
            return <Post index={index} key={index} userId={userId} post={post} />
          })}
          <span className="block h-10 text-center text-xl capitalize italic text-gray-500">
            Refresh for new posts
          </span>
        </div>
      </div>
    </>
  )
}

export default Posts
// 642c6f973af69e649eb07be0 - radhe
