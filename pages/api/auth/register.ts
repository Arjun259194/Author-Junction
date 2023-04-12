import { ZodUser } from "@/database/model/User";
import { createUser } from "@/database/operations";
import connectDB from "@/utils/api/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return postHandler(req, res);

    default:
      return res.status(405).json({ message: "Http method not available" });
  }
}

const UserInputSchema = ZodUser.pick({
  username: true,
  email: true,
  password: true,
});

type UserInput = z.infer<typeof UserInputSchema>;

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> {
  try {
    await connectDB();
    const input = req.body;
    const zRes = UserInputSchema.safeParse(input);
    if (!zRes.success) return res.status(400).json({ message: "Invalid data" });
    const { username, email, password } = zRes.data;
    const newUser = await (await createUser({ username, email, password })).save();
    return res.status(200).json({ message: "user created", user: newUser }); // this is just for api testing
  } catch (err) {
    console.log(err);
    return res.status(502).json({ error: err });
  }
}
