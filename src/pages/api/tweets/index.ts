import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

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
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    tweet,
  });
}
export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
