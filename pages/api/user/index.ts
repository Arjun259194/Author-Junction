import UserModel, { User, ZodUser } from "@/database/model/User";
import connectDB from "@/utils/api/connectDB";
import { getUserIdFromToken } from "@/utils/api/functions";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return putHandler(req, res);

    case "GET":
      return getHandler(req, res);

    default:
      return res.status(405).json({ message: "Http method not available" });
  }
}

const InputSchema = ZodUser.omit({
  password: true,
  followers: true,
  following: true,
});

async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const token = req.cookies.accessToken;
  const userId = getUserIdFromToken(token);
  if (!userId) return res.status(401).json({ message: "unauthorized" });
  const input = req.body;
  const zRes = InputSchema.safeParse(input);
  if (!zRes.success) return res.status(400).json({ message: "invalid data" });
  const { data } = zRes;
  try {
    const user: User | undefined = await UserModel.findByIdAndUpdate(userId, data).exec();
    if (!user)
      return res.status(200).json({ status: "warning", message: "data might not be changed" });
    return res.status(200).json({ message: "updated 👍" });
  } catch (err) {
    console.log(err);
    return res.status(502).json({ error: err });
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.accessToken;
  const userId = getUserIdFromToken(token);
  if (!userId) return res.status(401).json({ message: "unauthorized" });
  try {
    const user = await UserModel.findById(userId).exec();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(502).json({ error: err });
  }
}
