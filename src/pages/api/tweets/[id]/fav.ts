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
  const alreadyExists = await client.favorite.findFirst({
    where: {
      tweetId: id + "",
      userId: user?.id + "",
    },
  });
  if (alreadyExists) {
    await client.favorite.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.favorite.create({
      data: {
        user: {
          connect: {
            id: user?.id + "",
          },
        },
        tweet: {
          connect: {
            id: id + "",
          },
        },
      },
    });
  }
  res.json({ isSuccess: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
