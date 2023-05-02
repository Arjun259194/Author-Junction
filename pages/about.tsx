import Button from "@/UI/Button"
import HeroSection from "@/components/About/HeroSection"
import TechnologiesSection from "@/components/About/TechnologiesSection"
import UseCaseSection from "@/components/About/UseCaseSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Meta from "@/components/Meta"
import UserModel, { User } from "@/database/model/User"
import connectDB from "@/utils/api/connectDB"
import { getUserIdFromToken } from "@/utils/api/functions"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"

interface Props {
  status: boolean
  user: Pick<User, "username" | "email"> | null
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  await connectDB()
  const token = ctx.req.cookies.accessToken
  const userId = getUserIdFromToken(token)
  const user = await UserModel.findById<User>(userId).exec()

  if (!user) return { props: { status: false, user: null } }

  return { props: { status: true, user: { email: user.email, username: user.username } } }
}

const about: NextPage<Props> = ({ status, user }) => (
  <div className="h-screen overflow-y-scroll">
    <Meta title="About AuthorJunction" />
    <Header className="bg-gradient-to-r from-cyan-300 to-violet-500 ">
      <li className="text-gray-100">
        <Link href={"/"}>home</Link>
      </li>
      {!status && user === null ? (
        <>
          <li className="">
            <Link href="/auth/register">
              <Button className="" variant="secondary">
                register
              </Button>
            </Link>
          </li>
          <li className="">
            <Link href="/auth/login">
              <Button variant="primary">log in</Button>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="text-gray-100">
            <Link href="/user/following">following</Link>
          </li>
          <li className="text-gray-100">
            <Link href="/media">media</Link>
          </li>
          <li className="text-gray-100">
            <Link href={`/user/profile`}>profile</Link>
          </li>
        </>
      )}
    </Header>
    <main className="">
      <HeroSection />
      <UseCaseSection />
      <TechnologiesSection />
    </main>
    <Footer className="" />
  </div>
)

export default about
