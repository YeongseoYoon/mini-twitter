import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;
  const tweet = await client.tweet.findUnique({
    where: {
      id: id + "",
    },
    include: {
      user: true,
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });

  res.json({ ok: true, tweet });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
