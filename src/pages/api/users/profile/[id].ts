import { NextApiRequest, NextApiResponse } from "next";
import {
  ResponseType,
  client,
  withHandler,
  withApiSession,
} from "@/libs/server";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;
  const profile = await client.user.findUnique({
    where: { id: id + "" },
    select: {
      id: true,
      name: true,
      avatar: true,
      email: true,
      createdAt: true,
      tweets: {
        include: {
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      },
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
