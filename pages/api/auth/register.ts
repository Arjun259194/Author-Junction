import connectDB from "@/utils/connectDB"
import { createUser } from "@/utils/database/operations"
import { userData } from "@/utils/types"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      postHandler(req, res)
      break

    default:
      return res.status(405).json({ message: "Http method not available" })
  }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | void> {
  try {
    await connectDB()
    const { username, email, password }: userData = req.body
    //* not validating data here expecting that front-end validated before making request
    const newUser = await createUser({ username, email, password })
    await newUser.save()
    return res.status(200).redirect("/login")
  } catch (err) {
    return res.status(502).json({ error: err })
  }
}
