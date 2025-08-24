import { onMount } from 'svelte';
import { assert } from 'tsafe';
import { BASE_URL } from '../../../kc.gen';
import { useKcContext } from '../../KcContext.gen';
import { useI18n } from '../../i18n';

type ReturnTypeOfUseAuthenticate = { authenticate: () => Promise<void> };

type AuthenticateByWebAuthnInput = {
  isUserIdentified: boolean;
  challenge: string;
  userVerification: string;
  rpId: string;
  createTimeout: string | number;
  errmsg: string;
};

type AuthenticateByWebAuthnFn = (input: AuthenticateByWebAuthnInput) => void;
type InitAuthenticateFn = (
  input: AuthenticateByWebAuthnInput,
  availableCallback?: (available: boolean) => void,
) => void;

export const useAuthenticate = (): ReturnTypeOfUseAuthenticate => {
  const { kcContext } = useKcContext();

  assert(kcContext.enableWebAuthnConditionalUI);

  const { msgStr } = useI18n();

  const { isUserIdentified, challenge, userVerification, rpId, createTimeout } = kcContext;

  const input: Omit<AuthenticateByWebAuthnInput, 'errmsg'> = {
    challenge,
    createTimeout,
    isUserIdentified: isUserIdentified === 'true',
    rpId,
    userVerification,
  };

  onMount(async () => {
    const { initAuthenticate }: { initAuthenticate: InitAuthenticateFn } = await import(
      /* @vite-ignore */
      `${BASE_URL}keycloak-theme/login/js/passkeysConditionalAuth.js`
    );
    initAuthenticate({ errmsg: msgStr('passkey-unsupported-browser-text'), ...input });
  });

  const authenticate = async () => {
    const { authenticateByWebAuthn }: { authenticateByWebAuthn: AuthenticateByWebAuthnFn } = await import(
      /* @vite-ignore */
      `${BASE_URL}keycloak-theme/login/js/webauthnAuthenticate.js`
    );

    authenticateByWebAuthn({
      errmsg: msgStr('webauthn-unsupported-browser-text'),
      ...input,
    });
  };

  return { authenticate };
};
