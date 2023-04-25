import PostModel, { Post, ZodPost } from "@/database/model/Post"
import connectDB from "@/utils/api/connectDB"
import { isValidObjectId } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res)

    case "DELETE":
      return deleteHandler(req, res)

    case "PUT":
      return putHandler(req, res)

    default:
      return res.status(405).json({
        message: "Http method not available",
      })
  }
}

const zodUpdateInput = ZodPost.pick({
  title: true,
  content: true,
})

async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  const queryPostId = req.query.id
  if (!queryPostId) return res.status(400).json({ message: "No id provided" })
  let postId: string
  if (typeof queryPostId === "string") postId = queryPostId
  else postId = queryPostId[0]

  const input = req.body
  const parseInput = zodUpdateInput.safeParse(input)

  if (!parseInput.success) return res.status(400).json({ message: "invalid data" })

  const update = parseInput.data

  try {
    const post: Post | undefined = await PostModel.findByIdAndUpdate(
      postId,
      update
    ).exec()
    if (!post)
      return res
        .status(200)
        .json({ status: "warning", message: "post might not be updated" })
    return res.status(200).json({ message: "post updated" })
  } catch (err) {
    console.log(err)
    return res.status(502).json({ error: err })
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB()
    const postId = req.query.id as string | undefined

    const isValidId: boolean = isValidObjectId(postId)

    if (!isValidId) return res.status(400).json({ message: "Not valid id" })

    const post: Post | undefined = await PostModel.findById(postId).exec()

    if (!post) return res.status(404).json({ message: "Not Found" })

    return res.status(200).json(post)
  } catch (err) {
    console.log(err)
    return res.status(502).json({ error: err })
  }
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const queryId = req.query.id
    if (!queryId) return res.status(502).json({ message: "bad request" })
    let id: string
    if (typeof queryId === "string") id = queryId
    else id = queryId[0]
    await PostModel.findByIdAndDelete(id).exec()
    return res.status(200).json({ message: "deleted" })
  } catch (err) {
    console.log(err)
    return res.status(502).json({ error: err })
  }
}
