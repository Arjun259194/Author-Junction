import Button from "@/UI/Button"
import Paragraph from "@/UI/Paragraph"
import { SvgSearchArt, SvgWave2 } from "@/assets/svgArt"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroSection from "@/components/LandingPage/HeroSection"
import UserCaseSection from "@/components/LandingPage/UserCaseSection"
import Meta from "@/components/Meta"
import { NextPage } from "next"
import Link from "next/link"

const Index: NextPage = () => {
  return (
    <div className="">
      <Meta title="AuthorJunction" />
      <Header className=" bg-violet-700  text-gray-100">
        <li className="font-semibold text-gray-100">
          <Link href="/media">media</Link>
        </li>
        <li className="font-semibold text-gray-100">
          <Link href="/about">about</Link>
        </li>
        <li>
          <Link href="/auth/login">
            <Button variant="primary">log in</Button>
          </Link>
        </li>
        <li>
          <Link href="/auth/register">
            <Button className="" variant="secondary">
              register
            </Button>
          </Link>
        </li>
      </Header>
      <main className=" ">
        <HeroSection />
        <SvgWave2 />
        <section>
          <div className="mx-auto flex w-10/12 items-center space-x-6">
            <SvgSearchArt />
            <Paragraph>
              Discovering new writers and expanding your literary horizons has never been
              easier with AuthorJunction. Our platform offers a diverse range of genres
              and styles to suit your reading preferences. Explore our carefully curated
              selection of author profiles and sample chapters to find your next favorite
              writer. At AuthorJunction, we're passionate about helping readers connect
              with talented writers, and we're committed to providing a seamless and
              enjoyable user experience. Join our community today and discover the latest
              voices in the literary world.
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
