import AuthForm from "@/components/AuthForm"
import ErrorMessage from "@/components/ErrorMessage"
import Header from "@/components/Header"
import InputText from "@/components/InputText"
import useForm from "@/hooks/useForm"
import A from "@/UI/A"
import AuthFormLayout from "@/UI/AuthFormLayout"
import AuthPageLayout from "@/UI/AuthPageLayout"
import connectDB from "@/utils/api/connectDB"
import API from "@/utils/apiClient"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"

export const getServerSideProps: GetServerSideProps= async ctx => {
  await connectDB()
  const token = ctx.req.cookies.accessToken
  if (token)
    return {
      redirect: {
        destination: "/media",
        permanent: false,
      },
    } as any
}


interface FormState {
  username: string
  email: string
  password: string
  confPassword: string
}

interface ErrorState {
  state: boolean
  message: string
}

const Register:NextPage = () => {
  const {
    changeHandler,
    state: { confPassword, email, password, username },
  } = useForm<FormState>({
    confPassword: "",
    email: "",
    username: "",
    password: "",
  })

  const [error, setError] = useState<ErrorState>({ state: false, message: "" })
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const api = new API()

  const submitHandler: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    if (confPassword !== password) {
      setError({ state: true, message: "Password not matching" })
      return
    }

    setLoading(true)
    //registering user
    setError({ state: false, message: "" })
    const res = await api.registerUser({ username, email, password })
    if (res.status === 502) {
      const data = await res.json()
      console.log("Error:", data)
      setError({ state: true, message: "Error registering user, try again" })
    } else if (res.status === 400) {
      setError({ state: true, message: "Invalid input try again" })
    } else if (res.status === 200) {
      setError({ state: false, message: "" })
      router.push("/auth/login")
    }

    setLoading(false)
  }

  return (
    <AuthPageLayout>
      <ErrorMessage error={error} />
      <Head>
        <title>Register</title>
      </Head>
      <Header>
        <li>
          <Link href="/about">about</Link>
        </li>
        <li>
          <Link href="/contact">contact</Link>
        </li>
      </Header>
      <AuthFormLayout>
        <span className="mb-2 text-sm font-semibold text-cyan-700">
          Register as new user
        </span>
        <h2 className="mb-2 text-5xl font-bold text-gray-900">Create new account</h2>
        <span className="text-sm text-gray-600">
          Already a member?{" "}
          <A className="text-violet-500" href="/auth/login">
            Login
          </A>
        </span>
        <AuthForm loading={loading} submitHandler={submitHandler} submitText="register">
          <InputText
            required={true}
            text="Username"
            name="username"
            type="text"
            changeHandler={changeHandler}
            value={username}
          />
          <InputText
            required={true}
            text="Email"
            name="email"
            type="email"
            changeHandler={changeHandler}
            value={email}
          />
          <InputText
            required={true}
            text="Password"
            name="password"
            type="password"
            changeHandler={changeHandler}
            value={password}
          />
          <InputText
            required={true}
            text="Confirm Password"
            name="confPassword"
            type="password"
            changeHandler={changeHandler}
            value={confPassword}
          />
        </AuthForm>
      </AuthFormLayout>
    </AuthPageLayout>
  )
}

export default Register;
