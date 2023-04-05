import connectDB from "@/utils/api/connectDB"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return postHandler(res)
    default:
      return res.status(405).json({ message: "Http method not available" })
  }
}

async function postHandler(res: NextApiResponse) {
  await connectDB()
  res.setHeader(
    "Set-Cookie",
    "accessToken=; HttpOnly; Max-Age=0; 01 Jan 1970 00:00:00 GMT; Path=/"
  )
  return res.status(200).json({ message: "Logged out 👍" })
}
