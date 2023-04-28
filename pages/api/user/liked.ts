import PostModel, { Post } from "@/database/model/Post"
import connectDB from "@/utils/api/connectDB"
import { getUserIdFromToken } from "@/utils/api/functions"
import { isValidObjectId } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res)

    default:
      return res.status(405).json({ message: "Http method not available" })
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  const token = req.cookies.accessToken
  const userId = getUserIdFromToken(token)
  if (!isValidObjectId(userId) || !userId)
    return res.status(401).json({ message: "not authorized" })
  try {
    const posts = await PostModel.find<Post>({ likes: { $in: [userId] } }).sort({
      updatedAt: -1,
    })

    if (posts.length <= 0) return res.status(404).json({ message: "no post found" })

    return res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    return res.status(502).json({ error: err })
  }
}
