import { FC } from "react"

const LoadingPost: FC = () => {
  return (
    <article className="mx-3 mb-6 min-w-min space-y-2 rounded-md border-2 border-gray-200 bg-gray-50 p-2 text-gray-900 shadow-md transition-all duration-200">
      <h4 className="text-xl font-semibold capitalize text-gray-600 hover:text-violet-500 hover:underline">
        <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200"></div>
      </h4>
      <h3 className="rounded-lg p-1 text-2xl font-semibold text-gray-900 hover:text-cyan-600 hover:underline">
        <div className="h-6 w-3/4 animate-pulse rounded-md bg-gray-300"></div>
      </h3>
      <hr />
      <div className="space-y-2 p-1 text-base leading-relaxed text-gray-700">
        <div className="h-4 w-2/4 animate-pulse rounded-md bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200" />
        <div className="h-4 w-2/4 animate-pulse rounded-md bg-gray-200" />
      </div>
      <hr />
      <div className="flex w-full justify-evenly text-xl capitalize">
        <div className="h-4 w-1/4 animate-pulse rounded-md bg-gray-200" />
        <div className="h-4 w-1/4 animate-pulse rounded-md bg-gray-200" />
        <div className="h-4 w-1/4 animate-pulse rounded-md bg-gray-200" />
      </div>
    </article>
  )
}

export default LoadingPost
