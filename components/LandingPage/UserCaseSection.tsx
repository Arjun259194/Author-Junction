import Title from "@/UI/Title"
import { Art1, Art2 } from "@/assets/svgArt"
import { FC } from "react"

interface Props {}

const UserCaseSection: FC<Props> = ({}) => {
  return (
    <section className="relative py-24">
      <div className="mx-auto flex w-10/12 flex-col items-center space-y-8">
        <Title>Explore your options</Title>
        <div className="flex w-full flex-col justify-around space-y-4">
          <div className="flex items-center justify-around ">
            <div className="rounded-md bg-gray-50 p-4 shadow-md">
              <Art1 />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Find and read new content as a <span className="text-cyan-600">Reader</span>
            </h3>
          </div>
          <span className="self-center text-lg font-semibold">OR</span>
          <div className="flex flex-row-reverse items-center justify-around ">
            <div className="rounded-md bg-gray-50 p-4 shadow-md">
              <Art2 />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Share your work to new readers as an{" "}
              <span className="text-cyan-600">Author</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserCaseSection
