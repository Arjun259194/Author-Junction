// todo: create a endpoint that gives most popular posts

import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(405).send("This end point is not ready yet")
}
