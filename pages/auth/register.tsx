import InputText from "@/components/InputText";
import useForm from "@/hooks/useForm";
import { isStrongPassword, isValidEmail } from "@/utils/validation";
import Head from "next/head";
import Image from "next/image";
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

// ?    : almost ready
// !    : not tested perfectly
// todo : test
// todo : make as many reusable components (UI, logic) from this as you can for login page
export default function register() {
  const {
    changeHandler,
    state: { confPassword, email, password, username },
  } = useForm<FormState>({ confPassword: "", email: "", username: "", password: "" });
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const router = useRouter();

  const submitHandler: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    // validating user input
    if (!isValidEmail(email)) return setError({ state: true, message: "Not a valid Email" });
    if (!isStrongPassword(password)) return setError({ state: true, message: "Password is too weak" });
    if (password !== confPassword) return setError({ state: true, message: "confirm password not matching" });

    //registering user
    setError({ state: false, message: "" });
    registerUser();
  };

  const registerUser = async () => {
    const reqHeader = new Headers();
    reqHeader.append("Content-Type", "application/json");

    const fetchOption: RequestInit = {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: reqHeader,
    };

    const res = await fetch("/api/auth/register", fetchOption);

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      return setError({ state: true, message: "Failed to register, try again" });
    }

    router.push("/auth/login");
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-[url('/bg.jpg')] bg-center">
      {error.state ? (
        <span className="absolute bottom-0 left-1/2 z-40 my-4 w-6/12 -translate-x-1/2 animate-pulse rounded bg-red-900/90 p-1 text-center font-mono text-xl font-normal capitalize text-red-300">
          {error.message}{" "}
        </span>
      ) : null}
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
            <InputText
              required={true}
              text="Username"
              name="username"
              type="text"
              changeHandler={changeHandler}
              value={username}
            />
            <InputText required={true} text="Email" name="email" type="email" changeHandler={changeHandler} value={email} />
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
            <input className="rounded-full bg-blue-400 py-2 px-4 text-xl capitalize text-white " type="submit" value="Register" />
          </form>
        </div>
      </main>
    </div>
  );
}
