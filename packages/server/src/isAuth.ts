import { MiddlewareFn } from 'type-graphql';
import { MyContext } from './MyContext';
import { verify } from 'jsonwebtoken';

//bearer 4542930548-35

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('not authenticated');
  }
  try {
    const token = authorization.split(' ')[1];
    //the payload is whatever we used to sign our token
    //(the object we passed to sign())
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error('not authenticated');
  }

  //next to move on to the next middleware
  return next();
};
