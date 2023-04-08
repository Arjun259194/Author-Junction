import PostModel, { Post } from "@/database/model/Post";
import { createPost } from "@/database/operations";
import connectDB from "@/utils/api/connectDB";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return postHandler(req, res);

    case "GET":
      return getHandler(req, res);

    default:
      return res.status(405).json({ message: "Http method not available" });
  }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const { title, content } = req.body as {
      title: string;
      content: string;
    };

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ message: "unauthorized" });
    const payload = jwt.decode(token) as jwt.JwtPayload;
    const id = payload.id;
    const post = createPost({
      title,
      content,
      creator: id,
    });
    await post.save();
    return res.status(200).json({ message: "post created 👍" });
  } catch (err) {
    console.log(err);
    return res.status(502).json({ error: err });
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts: Post[] | undefined = await PostModel.find().exec();

    if (!posts) return res.status(404).json({ message: "There are not posts" });

    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(502).json({ error: err });
  }
}
