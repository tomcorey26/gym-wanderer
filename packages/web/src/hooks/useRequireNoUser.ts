// Hook (use-require-auth.js)
import { useEffect } from 'react';
import { useRouter } from './useRouter';
import { getAccessToken } from '../accessToken';

export const useRequireNoUser = (redirectUrl = '/') => {
  const router = useRouter();
  const isUserLoggedIn: boolean = !!getAccessToken();

  useEffect(() => {
    if (isUserLoggedIn === true) {
      router.push(redirectUrl);
    }
  }, [isUserLoggedIn, redirectUrl, router]);

  return isUserLoggedIn;
};
