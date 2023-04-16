import Button from "@/UI/Button"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Meta from "@/components/Meta"
import useForm from "@/hooks/useForm"
import connectDB from "@/utils/api/connectDB"
import { getUserIdFromToken } from "@/utils/api/functions"
import API from "@/utils/apiClient"
import type { GetServerSideProps, NextPage } from "next"
import { FormEventHandler, useState } from "react"

type FormState = {
  title: string
  description: string
  content: string
}

const CreatePost: NextPage = () => {
  const apiClient = new API()
  const {
    changeHandler,
    reset,
    state: { title, description, content },
  } = useForm<FormState>({
    title: "",
    description: "",
    content: "",
  })

  const [error, setError] = useState<{ state: boolean; message: string }>({
    state: false,
    message: "",
  })

  const ErrorMessage = (msg: string): void => {
    setError({ state: true, message: msg })
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    const res = await apiClient.createPost({ title, content, description })
    if (!res.ok) {
      ErrorMessage("Post not created, try again!")
    } else {
      window.location.href = "/user/profile"
    }
  }

  return (
    <div className="bg-gradient-to-tl from-cyan-400 to-violet-400">
      <Meta title="Create Post" />
      <Header />
      <main>
        <section className="mx-auto w-10/12 py-10">
          <form
            onSubmit={submitHandler}
            className=" space-y-4 rounded-2xl bg-gradient-to-tl from-cyan-500 to-violet-500 p-4 text-gray-100 shadow-md  "
          >
            <div className="flex flex-col ">
              <label className="text-2xl capitalize" htmlFor="title">
                Title
              </label>
              <input
                onChange={changeHandler}
                className="scrollbar-hide w-full rounded-2xl border-2 border-violet-300 bg-gray-100 p-2 text-lg text-gray-900 outline-none focus:border-cyan-400"
                type="text"
                name="title"
                id="title"
                value={title}
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-2xl capitalize" htmlFor="description">
                Description
              </label>
              <textarea
                onChange={changeHandler}
                className="scrollbar-hide h-max rounded-2xl border-2 border-violet-300 bg-gray-100 p-2 text-lg text-gray-900 outline-none focus:border-cyan-400"
                rows={5}
                name="description"
                id="description"
                value={description}
              ></textarea>
            </div>
            <div className="flex flex-col ">
              <label className="text-2xl capitalize" htmlFor="content">
                Content
              </label>
              <textarea
                onChange={changeHandler}
                className="w-full rounded-2xl border-2 border-violet-300 bg-gray-100 p-2 text-lg text-gray-900 outline-none focus:border-cyan-400"
                id="content"
                name="content"
                rows={15}
                value={content}
              ></textarea>
            </div>
            <div className="flex justify-between pt-3">
              <Button
                className="hover:bg-red-500 hover:text-white"
                onClick={reset}
                variant="secondary"
              >
                clear
              </Button>
              <div className="space-x-4">
                <Button className="text-xl" type="submit" variant="primary">
                  Create
                </Button>
                <Button
                  type="button"
                  onClick={_ => (window.location.href = "/")}
                  className="text-xl"
                  variant="secondary"
                >
                  cancel
                </Button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer className="font-semibold text-gray-700" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  await connectDB()

  const token = context.req.cookies["accessToken"]

  const userId = getUserIdFromToken(token)

  if (!userId) return { redirect: { destination: "/auth/login", permanent: false } }

  return { props: {} }
}

export default CreatePost
