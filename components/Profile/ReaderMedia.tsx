import API from "@/utils/apiClient"
import { FC, useEffect, useState } from "react"
import MediaFeed from "../MediaFeed"
import Post from "../MediaFeed/Post"

interface Props {
  userId: string
}

interface FullPost extends Omit<Post,"creator"> {
  creator : {
    username: string,
    _id: string
  }
}

const ReaderMedia: FC<Props> = ({ userId }) => {
  const [posts, setPosts] = useState<Array<FullPost>>([])
  const api = new API()
  const fetchFunction = () => {
    setLoading(true)
    api
      .likedPost()
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
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchFunction()
  }, [])

  return (
    <div className="mx-auto w-4/5">
      <MediaFeed
        fetchFunction={fetchFunction}
        loading={loading}
        posts={posts}
        userId={userId}
      >
        <span className="mt-5 capitalize">posts you Liked</span>
      </MediaFeed>
    </div>
  )
}

export default ReaderMedia
