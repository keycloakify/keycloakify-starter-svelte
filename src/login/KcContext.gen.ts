import { getContext, setContext } from 'svelte';

export type KcContext =
  | import('./pages/login/KcContext').KcContext
  | import('./pages/register/KcContext').KcContext
  | import('./pages/code/KcContext').KcContext
  | import('./pages/delete-account-confirm/KcContext').KcContext
  | import('./pages/delete-credential/KcContext').KcContext
  | import('./pages/link-idp-action/KcContext').KcContext
  | import('./pages/login-config-totp/KcContext').KcContext
  | import('./pages/login-oauth-grant/KcContext').KcContext
  | import('./pages/login-otp/KcContext').KcContext
  | import('./pages/login-password/KcContext').KcContext
  | import('./pages/login-recovery-authn-code-config/KcContext').KcContext
  | import('./pages/login-recovery-authn-code-input/KcContext').KcContext
  | import('./pages/login-reset-password/KcContext').KcContext
  | import('./pages/login-update-password/KcContext').KcContext
  | import('./pages/login-username/KcContext').KcContext;

const KC_CONTEXT_KEY = Symbol('kcContext');

export const setKcContext = (kcContext: KcContext) => {
  setContext<KcContext | undefined>(KC_CONTEXT_KEY, kcContext);
};

export const getKcContext = () => {
  return getContext<KcContext | undefined>(KC_CONTEXT_KEY);
};

export function useKcContext(): { kcContext: KcContext } {
  const kcContext = getKcContext();

  if (kcContext === undefined) {
    throw new Error('useKcContext must be used within a KcContextProvider');
  }

  return { kcContext };
}
