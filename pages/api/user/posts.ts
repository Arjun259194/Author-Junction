import PostModel, { Post } from "@/database/model/Post";
import { getUserIdFromToken } from "@/utils/api/functions";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    default:
      return res.status(405).json({ message: "Http method not available" });
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.accessToken;
    const userId = getUserIdFromToken(token);

    if (!isValidObjectId(userId) || !userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const posts = await PostModel.find<Post>({ creator: userId }).sort({ createdAt: -1 });
    if (posts.length <= 0) return res.status(404).json({ message: "no post found" });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(502).json({ error: err });
  }
}
