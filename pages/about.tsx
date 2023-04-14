import Paragraph from "@/UI/Paragraph"
import Title2 from "@/UI/Title2"
import HeroSection from "@/components/About/HeroSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

const about: NextPage = () => {
  return (
    <div className="h-screen overflow-y-scroll">
      <Head>
        <title>About AuthorJunction</title>
        <meta name="description" content="About AuthorJunction" />
      </Head>
      <Header className="bg-gradient-to-r from-cyan-300 to-violet-500 ">
        <li className="text-gray-50">
          <Link href={"/"}>home</Link>
        </li>
        <li className="text-gray-50">
          <Link href={"/about"}>about</Link>
        </li>
        <li className="text-gray-50">
          <Link href={"/contact"}>contact</Link>
        </li>
      </Header>
      <main className="">
        <HeroSection />
        <section className="bg-gray-100 py-12">
          <div className="mx-auto flex h-full w-10/12 flex-col items-start justify-center space-y-6">
            <Title2>Who can use AuthorJunction</Title2>
            <Paragraph className="">
              AuthorJunction is used by people who want to discover new book author and
              want to read new content. If is created to small authors can share there
              work with public with ease.
            </Paragraph>
          </div>
        </section>
      </main>
      <Footer className="bg-gray-200 text-gray-600" />
    </div>
  )
}

export default about
