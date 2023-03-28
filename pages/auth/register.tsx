import InputText from "@/components/InputText"
import useForm from "@/hooks/useForm"
import ButtonPrim from "@/UI/ButtonPrim"
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
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-800/80 to-gray-800/50 z-0"></div>
      <main className="w-10/12 mx-auto h-full flex  relative z-20">
        <div className="my-auto">
          <span className="text-sm mb-2 font-semibold text-gray-300">Register as new user</span>
          <h2 className="text-5xl font-bold mb-2 text-gray-200">Create new account</h2>
          <span className="text-sm text-gray-400">
            Already a member?{" "}
            <Link className="text-blue-500 underline underline-offset-2" href="/auth/login">
              Login
            </Link>
          </span>
          <form className="space-y-6 my-4">
            <InputText text="Username" name="username" type="text" changeHandler={changeHandler} value={state.username} />
            <InputText text="Email" name="email" type="email" changeHandler={changeHandler} value={state.email} />
            <InputText text="Password" name="password" type="password" changeHandler={changeHandler} value={state.password} />
            <InputText text="Confirm Password" name="confPassword" type="password" changeHandler={changeHandler} value={state.confPassword} />
          </form>
          <ButtonPrim clickHandler={() => {
            console.log(state)
          }}>Register</ButtonPrim>
        </div>
      </main>
    </div>
  )
}
