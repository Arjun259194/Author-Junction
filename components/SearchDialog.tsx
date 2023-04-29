import { Post } from "@/database/model/Post"
import { Combobox, Dialog } from "@headlessui/react"
import { Dispatch, FC, SetStateAction, useState } from "react"

interface Props {
  posts: Pick<Post, "_id" | "title">[]
  setStateFunction: Dispatch<SetStateAction<boolean>>
  isOpenState: boolean
}

const Searchdialog: FC<Props> = ({ posts, isOpenState, setStateFunction }) => {
  // const [isOpen, setIsOpen] = useState<boolean>(true)
  const [query, setQuery] = useState<string>("")

  const filterPost =
    query === ""
      ? posts
      : posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <Dialog
      className={`fixed inset-0 overflow-y-scroll p-2 pt-[25vh] `}
      open={isOpenState}
      onClose={setStateFunction}
      as="div"
    >
      <Dialog.Overlay className={`fixed inset-0 z-10 bg-gray-900/30`} />
      <Combobox
        onChange={(post: any) => {
          setStateFunction(false)
          window.location.href = `/post/${post._id}`
        }}
        as="div"
        className="relative z-20 mx-auto max-w-4xl divide-y divide-gray-300 rounded-md bg-gray-100 ring-2 ring-gray-900/20"
      >
        <Combobox.Input
          placeholder="Search..."
          className={`w-full border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:outline-none`}
          onChange={ev => {
            setQuery(ev.target.value)
          }}
        />
        {filterPost.length > 0 ? (
          <Combobox.Options
            className={`scrollbar-hide max-h-64 overflow-y-scroll py-2`}
            static
          >
            {filterPost.map((post, i) => (
              <Combobox.Option value={post} key={i}>
                {({ active }) => (
                  <div
                    className={`cursor-pointer p-2 capitalize  ${
                      active ? "bg-violet-500 text-gray-100" : ""
                    }`}
                  >
                    <span>{post.title}</span>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        ) : null}
        {query && filterPost.length === 0 ? (
          <p className="p-2 text-gray-500">No Result Found</p>
        ) : null}
      </Combobox>
    </Dialog>
  )
}

export default Searchdialog
