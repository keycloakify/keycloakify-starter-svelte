import { assert } from 'tsafe';
import { BASE_URL } from '../../../kc.gen';
import { useKcContext } from '../../KcContext.gen';
import { useI18n } from '../../i18n';

type ReturnTypeOfUseAuthenticate = { authenticate: () => Promise<void> };

type AuthenticateByWebAuthnInput = {
  isUserIdentified: boolean;
  challenge: string;
  userVerification: UserVerificationRequirement | 'not specified';
  rpId: string;
  createTimeout: string | number;
  errmsg: string;
};

type AuthenticateByWebAuthnFn = (input: AuthenticateByWebAuthnInput) => void;

export const useAuthenticate = (): ReturnTypeOfUseAuthenticate => {
  const { kcContext } = useKcContext();

  assert(kcContext.pageId === 'webauthn-authenticate.ftl');

  const { msgStr } = useI18n();

  const authenticate = async () => {
    try {
      const { authenticateByWebAuthn }: { authenticateByWebAuthn: AuthenticateByWebAuthnFn } = await import(
        /* @vite-ignore */
        `${BASE_URL}keycloak-theme/login/js/webauthnAuthenticate.js`
      );

      const { isUserIdentified, challenge, userVerification, rpId, createTimeout } = kcContext;
      const input: AuthenticateByWebAuthnInput = {
        challenge,
        createTimeout,
        errmsg: msgStr('webauthn-unsupported-browser-text'),
        isUserIdentified: isUserIdentified === 'true',
        rpId,
        userVerification,
      };
      authenticateByWebAuthn(input);
    } catch (error) {
      console.error('Failed to load or execute webauthn-authenticate script:', error);
    }
  };

  return { authenticate };
};
