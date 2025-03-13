import type { ParamsOfCreateOidc } from 'oidc-spa';
import type { ValueOrAsyncGetter } from 'oidc-spa/tools/ValueOrAsyncGetter';
import type { ParamsOfCreateMockOidc } from '../mock';
import { createMockSvelteOidc } from '../mock/svelte';
import { createSvelteOidc } from '../svelte';

export const oidcMockParams: ParamsOfCreateMockOidc<Record<string, unknown>, true> = {
  isUserInitiallyLoggedIn: true,
  homeUrl: import.meta.env.BASE_URL,
  autoLogin: true,
};

export const oidcParams: ValueOrAsyncGetter<ParamsOfCreateOidc<Record<string, unknown>, true>> = async () => {
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
    autoLogin: true,
  } satisfies ParamsOfCreateOidc<Record<string, unknown>, true>;
};

export const { OidcProvider, useOidc, getOidc, initializeOidc } = import.meta.env.DEV
  ? createMockSvelteOidc(oidcMockParams)
  : createSvelteOidc(oidcParams);
