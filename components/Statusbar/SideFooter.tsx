import { locationIcon } from "@/assets/icons"

const SideFooter = () => {
  return (
    <footer className="my-5 flex flex-col items-center space-y-1 rounded-md bg-cyan-50 p-2 text-center font-normal text-gray-600 shadow-md">
      <p>&copy; AuthorJunction {new Date().getFullYear()}. All Rights Reserved</p>
      <p>ML institute of Diploma studies</p>
      <p className="flex items-center ">
        <span className="aspect-square h-6">{locationIcon}</span> mehsana, gujarat
      </p>
      <p>+91 8200271084</p>
      <p>arjun259194@gmail.com</p>
    </footer>
  )
}

export default SideFooter
