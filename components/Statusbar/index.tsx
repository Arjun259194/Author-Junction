import A from "@/UI/A"
import { Post } from "@/database/model/Post"
import API from "@/utils/apiClient"
import { useEffect, useState } from "react"
import SideFooter from "./SideFooter"
import FadeIn from "@/UI/FadeIn"

const Statusbar = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const apiClient = new API()
  useEffect(() => {
    setLoading(true)
    apiClient
      .getPopularPost()
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <section className="flex w-2/5 min-w-max flex-col space-y-4 px-2">
      <FadeIn>
        <div className="min-w-max rounded-md border-2 border-gray-300 bg-gray-50 px-4">
          <h3 className="my-2 text-center text-2xl font-semibold">Popular</h3>
          <div className="flex flex-col divide-y pb-2 text-base font-normal [&>*]:my-1">
            {loading ? (
              <>
                <div className="h-4 w-full animate-pulse rounded-md bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded-md bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded-md bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded-md bg-gray-200" />
              </>
            ) : posts.length <= 0 ? (
              <span>no post on trend right now</span>
            ) : (
              <>
                {posts.map((post, i) => (
                  <A key={i} href={`/post/${post._id}`}>
                    {post.title}
                  </A>
                ))}
              </>
            )}
          </div>
        </div>
      </FadeIn>
      <hr />
      <FadeIn>
        <SideFooter />
      </FadeIn>
    </section>
  )
}

export default Statusbar
