import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const tweets = await client.tweet.findMany({
    include: {
      _count: {
        select: {
          favorites: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          createdAt: true,
        },
      },
    },
  });

  const tweetsWithIsLiked = await Promise.all(
    tweets.map(async (tweet) => {
      const isLiked = Boolean(
        await client.favorite.findFirst({
          where: {
            tweetId: tweet.id,
            userId: req.session.user?.id,
          },
          select: {
            id: true,
          },
        })
      );
      return { ...tweet, isLiked };
    })
  );

  res.json({
    isSuccess: true,
    tweets: tweetsWithIsLiked,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
