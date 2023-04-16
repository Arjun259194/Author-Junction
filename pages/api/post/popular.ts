// todo: create a endpoint that gives most popular posts

import PostModel, { Post } from "@/database/model/Post"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "not valid" })
  }

  const posts = await PostModel.find<Pick<Post, "title" | "id">>({}, "title _id id")
    .limit(4)
    .sort({ likes: 1 })

  if (posts.length <= 0) return res.status(404).json({ message: "not found" })

  return res.status(200).json(posts)
}
