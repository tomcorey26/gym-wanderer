// Hook (use-require-auth.js)
import { useEffect } from 'react';
import { useRouter } from './useRouter';
import { getAccessToken } from '../accessToken';
import { useLocation } from 'react-router-dom';

export const useRequireNoUser = (redirectUrl = '/') => {
  const router = useRouter();
  const location = useLocation();
  const isUserLoggedIn: boolean = !!getAccessToken();
  const onRegisterPage = location.pathname === '/register';

  useEffect(() => {
    if (isUserLoggedIn === true && onRegisterPage) {
      router.push(redirectUrl);
    }
  }, [isUserLoggedIn, redirectUrl, router, onRegisterPage]);

  return isUserLoggedIn;
};
