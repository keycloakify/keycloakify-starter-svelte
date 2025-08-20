import { getContext, setContext } from 'svelte';

export type KcContext =
  | import('./pages/login/KcContext').KcContext
  | import('./pages/register/KcContext').KcContext
  | import('./pages/code/KcContext').KcContext
  | import('./pages/delete-account-confirm/KcContext').KcContext;

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
