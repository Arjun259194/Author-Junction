// todo: create a endpoint that gives most popular posts

import PostModel from "@/database/model/Post"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "not valid" })
  }

  // const posts = await PostModel.find<Pick<Post, "title" | "id">>({}, "title _id id")
  const posts = await PostModel.aggregate([
    {
      $addFields: {
        likes_count: {
          $size: {
            $ifNull: ["$likes", []],
          },
        },
      },
    },
    {
      $sort: {
        likes_count: -1,
      },
    },
  ])
    .limit(4)
    .exec()

  /**
   *
   */

  if (posts.length <= 0) return res.status(404).json({ message: "not found" })

  return res.status(200).json(posts)
}
