import A from "@/UI/A"
import { Post } from "@/database/model/Post"
import API from "@/utils/apiClient"
import { useEffect, useState } from "react"
import SideFooter from "./SideFooter"

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
    <section className="flex w-2/5 flex-col space-y-4 px-2">
      <div className="rounded-md border border-gray-300 bg-blue-50 px-4 py-2 shadow-md">
        <h3 className="my-2 text-center text-2xl font-semibold">Popular</h3>
        <div className="flex flex-col divide-y text-base font-normal [&>*]:my-1">
          {
            loading
              ? <>
              <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
              <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
              <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
              <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
              </>
              : posts.length <= 0 ? (
                <span>no post on trend right now</span>
              ) : (
                <>
                  {posts.map((post, i) => (
                    <A key={i} href={`/post/${post._id}`}>
                      {post.title}
                    </A>
                  ))}
                </>
              )
          }
        </div>
      </div>
      <hr />
      <SideFooter />
    </section>
  )
}

export default Statusbar
