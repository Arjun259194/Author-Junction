import { locationIcon } from "@/assets/icons"

const SideFooter = () => {
  return (
    <footer className="my-5 flex flex-col items-start space-y-1.5 rounded-md border-2 border-gray-300 bg-gray-100 p-2 text-sm font-normal text-gray-600">
      <p>&copy; AuthorJunction {new Date().getFullYear()}. All Rights Reserved</p>
      <p>ML institute of Diploma studies</p>
      <p className="flex items-center ">
        <span className="aspect-square h-6">{locationIcon}</span> mehsana, gujarat
      </p>
      <p>+91 8200271084</p>
      <p>+91 9537711468</p>
      <p>arjun259194@gmail.com</p>
      <p>radhepatel2004@gmail.com</p>
    </footer>
  )
}

export default SideFooter
