import PostModel, { Post } from "@/database/model/Post"
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
  try {
    const reqId = req.query.id

    if (!reqId || !isValidObjectId(reqId))
      return res.status(502).json({ message: "query id not right" })

    let userId: string

    if (typeof reqId === "string") userId = reqId
    else userId = reqId[0]

    const posts = await PostModel.find<Post>({ creator: userId })
      .populate("creator", "username _id")
      .sort({ createdAt: -1 })

    if (posts.length <= 0) return res.status(404).json({ message: "no post found" })

    return res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    return res.status(502).json({ error: err })
  }
}
