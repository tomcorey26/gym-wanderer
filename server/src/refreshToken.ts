import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";
import { Request, Response } from "express";

export const refreshToken = async (req: Request, res: Response) => {
  //read cookie
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  //make sure token has not expires/is valid
  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  //token is valid and we can send back accessToken
  const user = await User.findOne({ id: payload.userId });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  //send refresh token
  sendRefreshToken(res, createRefreshToken(user));

  //if user and verified create access token
  return res.send({ ok: true, accessToken: createAccessToken(user) });
};
