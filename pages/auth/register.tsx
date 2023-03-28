import InputText from "@/components/InputText"
import useForm from "@/hooks/useForm"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { FormEventHandler } from "react"

interface FormState {
  username: string
  email: string
  password: string
  confPassword: string
}

//! form not ready
//todo : create form with <TextInput/>
export default function register() {
  const { changeHandler, reset, state } = useForm<FormState>({
    confPassword: "",
    email: "",
    username: "",
    password: "",
  })

  const submitHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    console.table(state)
    /* write submit logic here */
    reset()
  }

  return (
    <div className="relative flex h-screen w-full flex-col bg-[url('/bg.jpg')] bg-center">
      <Head>
        <title>Register</title>
      </Head>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-800 to-gray-800/50"></div>
      <header className="relative z-20 mx-auto my-4 flex w-10/12 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image className="aspect-square w-12" width={50} height={50} src="/logo.svg" alt="logo" />
          <h1 className="text-3xl font-bold text-white">AuthorJunction</h1>
        </div>
        <nav>
          <ul className="flex space-x-6 font-semibold capitalize text-gray-200 [&>li:hover]:underline">
            <li>
              <Link href="/about">about</Link>
            </li>
            <li>
              <Link href="/contact">contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="relative z-20 mx-auto my-auto h-max w-10/12 ">
        <div className="mx-auto w-1/2 rounded-xl bg-gray-800/90 p-5">
          <span className="mb-2 text-sm font-semibold text-gray-300">Register as new user</span>
          <h2 className="mb-2 text-5xl font-bold text-gray-200">Create new account</h2>
          <span className="text-sm text-gray-400">
            Already a member?{" "}
            <Link className="text-blue-500 underline underline-offset-2" href="/auth/login">
              Login
            </Link>
          </span>
          <form onSubmit={submitHandler} className="my-4 mb-6 space-y-6">
            <InputText text="Username" name="username" type="text" changeHandler={changeHandler} value={state.username} />
            <InputText text="Email" name="email" type="email" changeHandler={changeHandler} value={state.email} />
            <InputText text="Password" name="password" type="password" changeHandler={changeHandler} value={state.password} />
            <InputText text="Confirm Password" name="confPassword" type="password" changeHandler={changeHandler} value={state.confPassword} />
            <input className="rounded-full bg-blue-400 py-2 px-4 text-xl capitalize text-white " type="submit" value="Register" />
          </form>
        </div>
      </main>
    </div>
  )
}
