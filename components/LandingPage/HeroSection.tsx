import Button from "@/UI/Button"
import Paragraph from "@/UI/Paragraph"
import Title from "@/UI/Title"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface Props {}

const HeroSection: FC<Props> = ({}) => {
  return (
    <section className="bg-violet-700 pt-36 pb-28">
      <div className="mx-auto flex w-10/12">
        <div className="space-y-4 text-gray-200">
          <Title>A Platform for Small Authors to Share Their Words</Title>
          <Paragraph className="text-sm">
            Join AuthorJunction and share your writing with the world! Our platform is designed for
            small authors who want to showcase their work and connect with readers. Whether you
            write poetry, short stories, or novels, you can join our community and start sharing
            your passion for writing today.
          </Paragraph>
          <Link href="/media">
            <Button className="text-lg mt-5 font-semibold" variant="secondary">
              Get Started
            </Button>
          </Link>
        </div>
        <Image width={800 / 1.5} height={400 / 1.5} src="/landing_art.svg" alt="svg art" />
      </div>
    </section>
  )
}

export default HeroSection
