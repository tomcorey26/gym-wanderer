import { getConnection } from 'typeorm';
import { User } from 'src/entity/User';

export const revokeRefreshTokensForUser = async (userId: number) => {
  await getConnection()
    .getRepository(User)
    .increment({ id: userId }, 'tokenVersion', 1);

  return true;
};

export const grantRefreshTokensForUser = async (userId: number) => {
  await getConnection()
    .getRepository(User)
    .update({ id: userId }, { tokenVersion: 0 });
  return true;
};
