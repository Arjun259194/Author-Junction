import UserModel, { User } from "@/database/model/User"
import connectDB from "@/utils/api/connectDB"
import { getUserIdFromToken } from "@/utils/api/functions"
import { isValidObjectId } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return putHandler(req, res)
      break

    default:
      return res.status(405).json({ message: "Http method not available" })
      break
  }
}

async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  try {
    const token = req.cookies.accessToken
    const userId = getUserIdFromToken(token)
    if (!userId) return res.status(401).json({ message: "unauthorized" })

    const reqId = req.query.id
    if (!reqId || !isValidObjectId(reqId)) {
      return res.status(502).json({ message: "Id not vaild" })
    }

    let followUserId:string;

    if(typeof reqId === "string") followUserId = reqId
    else followUserId = reqId[0]
    //here
    const user = await UserModel.findById<User>(userId).exec()
    const followUser = await UserModel.findById<User>(followUserId).exec()

    if(!user || !followUser) {
      return res.status(404).json({message: "not found"})
    }

    if(followUser.following.includes(userId)){
      followUser.followers = followUser.followers.filter(u => u !== userId)
      user.following = user.following.filter(ui => ui !== followUserId)
    } else {
      followUser.followers.push(userId)
      user.following.push(followUserId)
    }

  } catch (err) {
    return res.status(502).json({ error: err })
  }
}
