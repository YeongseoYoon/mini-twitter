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
  const {
    body: { content },
    session: { user },
  } = req;
  const tweet = await client.tweet.create({
    data: {
      content,
      user: {
        connect: {
          id: user?.id + "",
        },
      },
    },
  });
  res.json({
    isSuccess: true,
    tweet,
  });
}
export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
