import { assert } from 'tsafe';
import { BASE_URL } from '../../../kc.gen';
import { useKcContext } from '../../KcContext.gen';
import { useI18n } from '../../i18n';

type ReturnTypeOfUseRegister = { register: () => Promise<void> };

type RegisterByWebAuthnInput = {
  userid: string;
  challenge: string;
  username: string;
  rpId: string;
  createTimeout: string | number;
  signatureAlgorithms: string;
  rpEntityName: string;
  attestationConveyancePreference: string;
  authenticatorAttachment: string;
  requireResidentKey: string;
  userVerificationRequirement: string;
  excludeCredentialIds: string;
  initLabel: string;
  initLabelPrompt: string;
  errmsg: string;
};

type RegisterByWebAuthnFn = (input: RegisterByWebAuthnInput) => void;

export const useRegister = (): ReturnTypeOfUseRegister => {
  const { kcContext } = useKcContext();

  assert(kcContext.pageId === 'webauthn-register.ftl');

  const { msgStr } = useI18n();

  const register = async () => {
    const { registerByWebAuthn }: { registerByWebAuthn: RegisterByWebAuthnFn } = await import(
      /* @vite-ignore */
      `${BASE_URL}keycloak-theme/login/js/webauthnRegister.js`
    );

    const {
      userid,
      challenge,
      username,
      rpId,
      createTimeout,
      signatureAlgorithms,
      rpEntityName,
      attestationConveyancePreference,
      authenticatorAttachment,
      requireResidentKey,
      userVerificationRequirement,
      excludeCredentialIds,
    } = kcContext;
    const input: RegisterByWebAuthnInput = {
      userid,
      challenge,
      username,
      rpId,
      createTimeout,
      signatureAlgorithms: JSON.stringify(signatureAlgorithms),
      rpEntityName,
      attestationConveyancePreference,
      authenticatorAttachment,
      requireResidentKey,
      userVerificationRequirement,
      excludeCredentialIds,
      initLabel: msgStr('webauthn-registration-init-label'),
      initLabelPrompt: msgStr('webauthn-registration-init-label-prompt'),
      errmsg: msgStr('webauthn-unsupported-browser-text'),
    };
    registerByWebAuthn(input);
  };

  return { register };
};
