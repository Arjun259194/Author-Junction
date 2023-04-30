import AuthForm from "@/components/AuthForm"
import ErrorMessage from "@/components/ErrorMessage"
import Header from "@/components/Header"
import InputText from "@/components/InputText"
import { ZodUser } from "@/database/model/User"
import useForm from "@/hooks/useForm"
import A from "@/UI/A"
import AuthFormLayout from "@/UI/AuthFormLayout"
import AuthPageLayout from "@/UI/AuthPageLayout"
import API from "@/utils/apiClient"
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

const zFormSchema = ZodUser.pick({
  email: true,
  password: true,
})

export default function Login() {
  const { changeHandler, reset, state } = useForm<FormState>({
    email: "",
    password: "",
  })
  const [error, setError] = useState<ErrorState>({
    state: false,
    message: "",
  })

  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const api = new API()

  function errorMessage(msg: string): void {
    setError({ state: true, message: msg })
  }

  function resetError(): void {
    setError({ state: false, message: "" })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    const zRes = zFormSchema.safeParse({
      email: state.email,
      password: state.password,
    })

    if (!zRes.success) return errorMessage("Form input invalid")
    setLoading(true)

    const res = await api.loginUser(zRes.data)

    if (res.status === 404) {
      errorMessage("email not found")
    } else if (res.status === 401) {
      errorMessage("wrong password")
    } else if (res.status === 502) {
      const data = await res.json()
      errorMessage("Error while logging in")
    } else {
      resetError()
      reset()
      router.push("/media")
    }
    setLoading(false)
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
        <span className="mb-2 text-sm font-semibold text-cyan-600">
          Login as an existing user
        </span>
        <h2 className="mb-2 text-5xl font-bold text-gray-900">Login with your account</h2>
        <span className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <A className="text-violet-500" href="/auth/register">
            Register
          </A>
        </span>
        <AuthForm loading={loading} submitHandler={handleSubmit} submitText="Login">
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
