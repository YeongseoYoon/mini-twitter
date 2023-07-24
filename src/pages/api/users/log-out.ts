import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ isSuccess: false, error: "Method Not Allowed" });
  }

  if (!req.session.user) {
    return res
      .status(401)
      .json({ isSuccess: false, error: "로그인되어 있지 않습니다." });
  }

  try {
    await req.session.destroy();

    return res.json({ isSuccess: true, message: "로그아웃되었습니다." });
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, error: "로그아웃에 실패했습니다." });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
