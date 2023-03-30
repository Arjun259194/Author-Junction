import Header from "@/components/Header";
import AuthFormLayout from "@/UI/AuthFormLayout";
import AuthPageLayout from "@/UI/AuthPageLayout";
import Link from "next/link";

export default function Login() {
  return (
    <AuthPageLayout>
      <Header>
        <li>
          <Link href="/about">about</Link>
        </li>
        <li>
          <Link href="/contact">contact</Link>
        </li>
      </Header>
      <AuthFormLayout>
        <span className="mb-2 text-sm font-semibold text-gray-300">Login as an existing user</span>
        <h2 className="mb-2 text-5xl font-bold text-gray-200">Login with your account</h2>
        <span className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link className="capitalize text-blue-500 underline underline-offset-2" href="/auth/register">
            Register
          </Link>
        </span>
        {/* Form here */}
      </AuthFormLayout>
    </AuthPageLayout>
  );
}
