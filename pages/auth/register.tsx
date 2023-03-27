import useForm from "@/hooks/useForm"
import Head from "next/head"
import Link from "next/link"

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
  return (
    <div className="bg-[url('/bg.jpg')] bg-center relative w-full h-screen">
      <Head>
        <title>Register</title>
      </Head>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent z-0"></div>
      <main className="w-10/12 mx-auto h-full flex  relative z-20">
        <div className="my-auto ">
          <span className="text-sm font-semibold text-gray-300">Register as new user</span>
          {/* styling the form from here */}
          <h2>Create new account</h2>
          <span>
            Already a member?
            <Link href="/login">Login</Link>
          </span>
        </div>
        <form></form>
      </main>
    </div>
  )
}
