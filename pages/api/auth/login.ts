import { User } from "@/database/model/User"
import connectDB from "@/utils/connectDB"
import { createToken, isValidUser as findAndValidateUser } from "@/utils/functions"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return postHandler(req, res)

    default:
      return res.status(405).json({ message: "Http method not available" })
  }
}

type TUserInput = { email: User["email"]; password: User["password"] }

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB()
    const { email, password }: TUserInput = req.body
    const result = await findAndValidateUser({ email, password })
    if (result.status === "not-found") return res.status(404).json({ message: "user with this email is not found" })
    if (result.status === "unauthorized") return res.status(401).json({ message: "Password is not valid" })

    const tokenPayload = { id: result.user._id, email: result.user.email }
    const TOKEN = createToken(tokenPayload)

    res.setHeader("Set-Cookie", `accessToken=${TOKEN}; HttpOnly; Max-Age=86400; Path=/`)

    return res.status(200).json({ message: "ok" })
  } catch (err) {
    return res.status(502).json({ error: err })
  }
}
