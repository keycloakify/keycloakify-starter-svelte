import { getContext, setContext } from 'svelte';
import type { createUseI18n } from './getI18n';

export const I18N_KEY = Symbol('kcI18n');

export const setI18nContext = <I18n extends ReturnType<typeof createUseI18n>['ofTypeI18n']>(i18n: I18n) => {
  setContext<I18n | undefined>(I18N_KEY, i18n);
};

export const getI18nContext = <I18n extends ReturnType<typeof createUseI18n>['ofTypeI18n']>() => {
  return getContext<I18n | undefined>(I18N_KEY);
};
