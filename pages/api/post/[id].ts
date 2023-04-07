import PostModel, { Post } from "@/database/model/Post";
import connectDB from "@/utils/api/connectDB";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    default:
      return res.status(405).json({
        message: "Http method not available",
      });
  }
}

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const postId = req.query.id as string | undefined;

    const isValidId: boolean = isValidObjectId(postId);

    if (!isValidId)
      return res
        .status(400)
        .json({ message: "Not valid id" });

    const post: Post | undefined = await PostModel.findById(
      postId
    ).exec();

    if (!post)
      return res.status(404).json({ message: "Not Found" });

    return res.status(200).json(post);
  } catch (err) {
    console.log(err);

    return res.status(502).json({ error: err });
  }
}
