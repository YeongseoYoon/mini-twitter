import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { getRandomHexColor } from "@/libs/utils/getRandomHexColor";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password, passwordConfirm, name } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ ok: false, error: "모든 필드를 입력해주세요." });
  }

  if (password !== passwordConfirm) {
    return res
      .status(400)
      .json({ ok: false, error: "비밀번호가 일치하지 않습니다." });
  }

  try {
    const existingUser = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ ok: false, error: "중복된 이메일입니다." });
    }
    const user = await client.user.create({
      data: {
        email,
        password,
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=${
          getRandomHexColor() + getRandomHexColor()
        }&color=${getRandomHexColor()}`,
      },
    });

    return res.json({
      ok: true,
      message: "회원가입이 완료되었습니다.",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, error: "회원가입에 실패했습니다." });
  }
}
export default withHandler({ methods: ["POST"], handler, isPrivate: false });
