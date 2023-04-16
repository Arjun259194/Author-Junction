import HeroSection from "@/components/About/HeroSection"
import TechnologiesSection from "@/components/About/TechnologiesSection"
import UseCaseSection from "@/components/About/UseCaseSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Meta from "@/components/Meta"
import { NextPage } from "next"
import Link from "next/link"

const about: NextPage = () => (
  <div className="h-screen overflow-y-scroll">
    <Meta title="About AuthorJunction" />
    <Header className="bg-gradient-to-r from-cyan-300 to-violet-500 ">
      <li className="text-gray-50">
        <Link href={"/"}>home</Link>
      </li>
      <li className="text-gray-50">
        <Link href={"/about"}>about</Link>
      </li>
    </Header>
    <main className="">
      <HeroSection />
      <UseCaseSection />
      <TechnologiesSection />
    </main>
    <Footer className="bg-gradient-to-b from-gray-100 to-gray-300 text-gray-600" />
  </div>
)

export default about
