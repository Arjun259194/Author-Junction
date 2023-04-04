import AuthForm from "@/components/AuthForm"
import ErrorMessage from "@/components/ErrorMessage"
import Header from "@/components/Header"
import InputText from "@/components/InputText"
import useForm from "@/hooks/useForm"
import AuthFormLayout from "@/UI/AuthFormLayout"
import AuthPageLayout from "@/UI/AuthPageLayout"
import { loginPost } from "@/utils/client/api"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"

interface FormState {
  email: string
  password: string
}

interface ErrorState {
  state: boolean
  message: string
}

export default function Login() {
  const { changeHandler, state } = useForm<FormState>({
    email: "",
    password: "",
  })
  const [error, setError] = useState<ErrorState>({
    state: false,
    message: "",
  })

  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  function errorMessage(msg: string): void {
    return setError({ state: true, message: msg })
  }

  function resetError(): void {
    return setError({ state: false, message: "" })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setLoading(true)
    const res = await loginPost({
      email: state.email,
      password: state.password,
    })
    if (res.status === 404) {
      errorMessage("email not found")
    } else if (res.status === 401) {
      errorMessage("wrong password")
    } else if (res.status === 502) {
      const data = await res.json()
      console.log(data)
      errorMessage("Error while logging in")
    }
    resetError()
    setLoading(false)
    router.push("/")
  }

  return (
    <AuthPageLayout>
      <ErrorMessage error={error} />
      <Head>
        <title>Login</title>
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
        <span className="mb-2 text-sm font-semibold text-gray-300">
          Login as an existing user
        </span>
        <h2 className="mb-2 text-5xl font-bold text-gray-200">
          Login with your account
        </h2>
        <span className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            className="capitalize text-blue-500 underline underline-offset-2"
            href="/auth/register"
          >
            Register
          </Link>
        </span>
        <AuthForm
          loading={loading}
          submitHandler={handleSubmit}
          submitText="Login"
        >
          <InputText
            type="email"
            required={true}
            name="email"
            text="Email"
            changeHandler={changeHandler}
            value={state.email}
          />
          <InputText
            type="password"
            required={true}
            name="password"
            text="Password"
            changeHandler={changeHandler}
            value={state.password}
          />
        </AuthForm>
      </AuthFormLayout>
    </AuthPageLayout>
  )
}
