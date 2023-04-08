import AuthForm from "@/components/AuthForm";
import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import InputText from "@/components/InputText";
import useForm from "@/hooks/useForm";
import AuthFormLayout from "@/UI/AuthFormLayout";
import AuthPageLayout from "@/UI/AuthPageLayout";
import API from "@/utils/apiClient";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

interface FormState {
  username: string;
  email: string;
  password: string;
  confPassword: string;
}

interface ErrorState {
  state: boolean;
  message: string;
}

export default function register() {
  const {
    changeHandler,
    state: { confPassword, email, password, username },
  } = useForm<FormState>({
    confPassword: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const api = new API();

  const submitHandler: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    setLoading(true);
    //registering user
    setError({ state: false, message: "" });
    const res = await api.registerUser({ username, email, password });
    if (res.status === 502) {
      const data = await res.json();
      console.log("Error:", data);
      setError({ state: true, message: "Error registering user, try again" });
    } else if (res.status === 200) {
      setError({ state: false, message: "" });
      router.push("/auth/login");
    }

    setLoading(false);
  };

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
        <span className="mb-2 text-sm font-semibold text-gray-300">Register as new user</span>
        <h2 className="mb-2 text-5xl font-bold text-gray-200">Create new account</h2>
        <span className="text-sm text-gray-400">
          Already a member?{" "}
          <Link className="text-blue-500 underline underline-offset-2" href="/auth/login">
            Login
          </Link>
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
  );
}
