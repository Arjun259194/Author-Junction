import PostModel, { Post, ZodPost } from "@/database/model/Post"
import UserModel, { User } from "@/database/model/User"
import { createPost } from "@/database/operations"
import connectDB from "@/utils/api/connectDB"
import { getUserIdFromToken } from "@/utils/api/functions"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return postHandler(req, res)

    case "GET":
      return getHandler(req, res)

    default:
      return res.status(405).json({ message: "Http method not available" })
  }
}

const zodInputValidatingSchema = ZodPost.pick({
  title: true,
  content: true,
  description: true,
})

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB()

    const input = req.body
    const zodRes = zodInputValidatingSchema.safeParse(input)

    if (!zodRes.success) return res.status(400).json({ message: "invalid data" })

    const token = req.cookies.accessToken
    const userId = getUserIdFromToken(token)

    const user = await UserModel.findById<User>(userId)

    if (!user) return res.status(401).json({ message: "unauthorized" })

    if (user.role === "READER") {
      user.role = "AUTHOR"
      await user.save()
    }

    const { title, content, description } = zodRes.data

    const post = createPost({ description, title, content, creator: user.id })

    await post.save()
    return res.status(200).json({ message: "post created 👍" })
  } catch (err) {
    console.log(err)
    return res.status(502).json({ error: err })
  }
}

interface FullPost extends Omit<Post, "creator"> {
  creator: { username: string; id: string }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  try {
    const posts = await PostModel.find<FullPost>()
      .populate("creator", "username id")
      .sort({ createdAt: -1 })
      .exec()
    if (!posts || posts.length <= 0)
      return res.status(404).json({ message: "There are not posts" })
    return res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    return res.status(502).json({ error: err })
  }
}
