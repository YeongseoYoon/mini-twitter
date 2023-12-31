import { NextApiRequest, NextApiResponse } from "next";
import {
  withApiSession,
  withHandler,
  client,
  ResponseType,
} from "@/libs/server";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await client.tweet.findUnique({
    where: {
      id: id + "",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.favorite.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id + "",
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ isSuccess: true, tweet, isLiked });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
