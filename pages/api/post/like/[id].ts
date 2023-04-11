import PostModel, { Post } from "@/database/model/Post";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      return putHandler(req, res);
    default:
      return res.status(405).json({
        message: "Http method not available",
      });
  }
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const postId = req.query.id as string;
    const isValidId = isValidObjectId(postId);
    if (!isValidId) return res.status(400).json({ message: "id not valid" });
    const post: Post | undefined = await PostModel.findById(postId).exec();
    if (!post) return res.status(404).json({ message: "post not found" });

    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ message: "not authorized" });

    const payload = jwt.decode(token) as jwt.JwtPayload;

    const userId: string = payload.id;

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(likeId => {
        return likeId != userId;
      });
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json({ message: "ok 👍" });
  } catch (err) {
    console.log(err);
    return res.status(502).json({ error: err });
  }
};
