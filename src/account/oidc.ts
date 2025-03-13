import { createMockSvelteOidc } from '../mock/svelte';
import { createSvelteOidc } from '../svelte';

const oidcMockParams = {
  isUserInitiallyLoggedIn: true as const,
  homeUrl: import.meta.env.BASE_URL,
  autoLogin: true as const,
};

const oidcParams = async () => {
  const { kcHttpRelativePath, realm } = (() => {
    const [
      // "" or "/auth"
      kcHttpRelativePath,
      // "myrealm/account"
      startsWithRealm,
    ] = window.location.pathname.split('/realms/');

    const realm = startsWithRealm.split('/')[0];

    return {
      realm,
      kcHttpRelativePath: kcHttpRelativePath || undefined,
    };
  })();

  return {
    issuerUri: `${window.location.origin}${kcHttpRelativePath ?? ''}/realms/${realm}`,
    clientId: 'account-console',
    homeUrl: `${kcHttpRelativePath ?? ''}/realms/${realm}/account/`,
    autoLogin: true as const,
  };
};

export const { OidcProvider, useOidc, getOidc } = import.meta.env.DEV
  ? createMockSvelteOidc(oidcMockParams)
  : createSvelteOidc(oidcParams);
