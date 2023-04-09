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

const putHandler = async (req: NextApiRequest, res: NextApiResponse) => {};
