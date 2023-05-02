import Button from "@/UI/Button"
import Paragraph from "@/UI/Paragraph"
import { SvgSearchArt, SvgWave2 } from "@/assets/svgArt"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroSection from "@/components/LandingPage/HeroSection"
import UserCaseSection from "@/components/LandingPage/UserCaseSection"
import Meta from "@/components/Meta"
import UserModel, { User } from "@/database/model/User"
import connectDB from "@/utils/api/connectDB"
import { getUserIdFromToken } from "@/utils/api/functions"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"

interface Props {
  status: boolean
  user?: Pick<User, "username" | "email"> | null
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  await connectDB()
  const token = ctx.req.cookies.accessToken
  const userId = getUserIdFromToken(token)
  const user = await UserModel.findById<User>(userId).exec()

  if (!user) return { props: { status: false, user: null } }

  return { props: { status: true, user: { email: user.email, username: user.username } } }
}

const Index: NextPage<Props> = ({ status, user }) => {
  return (
    <div className="">
      <Meta title="AuthorJunction" />
      <Header className=" bg-violet-700  text-gray-100">
        <li className="font-semibold text-gray-100">
          <Link href="/about">about</Link>
        </li>
        {!status && !user ? (
          <></>
        ) : (
          <>
            <li>
              <Link href="/user/profile">profile</Link>
            </li>
            <li>
              <Link href="/user/following">following</Link>
            </li>
            <li className="font-semibold text-gray-100">
              <Link href="/media">media</Link>
            </li>
          </>
        )}
        {user === null && !status ? (
          <div className="space-x-2">
            <Link href="/auth/register">
              <Button className="" variant="secondary">
                register
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="primary">log in</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col rounded-md p-1">
            <Link href={`/user/profile`}>
              <h3 className="text-lg capitalize">{user?.username}</h3>
            </Link>
            <span className="text-sm text-gray-200">{user?.email}</span>
          </div>
        )}
      </Header>
      <main className=" ">
        <HeroSection />
        <SvgWave2 />
        <section>
          <div className="mx-auto flex w-10/12 items-center space-x-6">
            <SvgSearchArt />
            <Paragraph>
              Discovering new writers and expanding your literary horizons has never been easier
              with AuthorJunction. Our platform offers a diverse range of genres and styles to suit
              your reading preferences. Explore our carefully curated selection of author profiles
              and sample chapters to find your next favorite writer. At AuthorJunction, we&apos;re
              passionate about helping readers connect with talented writers, and we&apos;re
              committed to providing a seamless and enjoyable user experience. Join our community
              today and discover the latest voices in the literary world.
            </Paragraph>
          </div>
        </section>
        <UserCaseSection />
      </main>
      <Footer className="" />
    </div>
  )
}

export default Index
