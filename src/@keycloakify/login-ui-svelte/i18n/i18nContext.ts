import { getContext, setContext } from 'svelte';
import type { createUseI18n } from './getI18n';

export const I18N_KEY = Symbol('kcI18n');

export const setI18nContext = (i18n: ReturnType<typeof createUseI18n>['ofTypeI18n']) => {
  setContext<ReturnType<typeof createUseI18n>['ofTypeI18n'] | undefined>(I18N_KEY, i18n);
};

export const getI18nContext = () => {
  return getContext<ReturnType<typeof createUseI18n>['ofTypeI18n'] | undefined>(I18N_KEY);
};
