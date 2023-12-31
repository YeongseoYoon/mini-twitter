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
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ isSuccess: false });
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({
        isSuccess: false,
        error: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    if (user) {
      req.session.user = {
        id: user.id,
      };
      await req.session.save();

      return res.json({ isSuccess: true, message: "로그인에 성공했습니다." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, error: "로그인에 실패했습니다." });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
