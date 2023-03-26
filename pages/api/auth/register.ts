import { User } from "@/database/model/User"
import { createUser } from "@/database/operations"
import connectDB from "@/utils/connectDB"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return postHandler(req, res)

    default:
      return res.status(405).json({ message: "Http method not available" })
  }
}

type TUserInput = { username: User["username"]; email: User["email"]; password: User["password"] }

async function postHandler(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | void> {
  try {
    await connectDB()
    const { username, email, password }: TUserInput = req.body
    //* not validating data here expecting that front-end validated before making request
    //? might validate input later
    //* if decide to validate data in future use Z library
    const newUser = await (await createUser({ username, email, password })).save()
    /**
     * ! we will redirect user to login page with code below in main application this is just for api testing
     * ? return res.status(200).redirect("/login")
     */
    return res.status(200).json({ message: "user created", user: newUser })
  } catch (err) {
    return res.status(502).json({ error: err })
  }
}
