import { BASE_URL } from '../../../../kc.gen';
import { useKcContext } from '../../../KcContext.gen';

type AuthChecker = {
  startSessionPolling: (redirectUrl: string) => void;
  checkAuthSession: (pageAuthSessionHash: string) => void;
};

export const useAuthChecker = () => {
  const { kcContext } = useKcContext();
  const checkAuth = async () => {
    const { startSessionPolling, checkAuthSession }: AuthChecker = await import(
      /* @vite-ignore */
      `${BASE_URL}keycloak-theme/login/js/authChecker.js`
    );
    startSessionPolling(kcContext.url.ssoLoginInOtherTabsUrl);
    if (kcContext.authenticationSession) {
      checkAuthSession(kcContext.authenticationSession.authSessionIdHash);
    }
  };
  checkAuth();
};
