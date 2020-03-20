import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string) => {
  //path should make it so cookie is not sent in request header
  //everytime, only when we hit /refresh_token
  //it is good practice to do this
  return res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token'
  });
};
