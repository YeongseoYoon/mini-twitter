import { NextApiRequest, NextApiResponse } from "next";
import {
  withApiSession,
  withHandler,
  ResponseType,
  client,
} from "@/libs/server";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id + "" },
    select: {
      id: true,
      name: true,
      avatar: true,
      email: true,
      createdAt: true,
    },
  });
  res.json({
    isSuccess: true,
    profile,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
