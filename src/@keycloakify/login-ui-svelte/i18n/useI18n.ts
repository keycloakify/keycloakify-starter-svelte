/* eslint-disable @typescript-eslint/no-explicit-any */
import type { createUseI18n } from './getI18n';
import { getI18nContext } from './i18nContext';

export function useI18n_internal<I18n extends ReturnType<typeof createUseI18n<any, any>>['ofTypeI18n']>(): I18n {
  const contextValue = getI18nContext<I18n>();

  if (contextValue === undefined) {
    throw new Error('useI18n must be used within a I18nProvider');
  }

  return contextValue;
}
