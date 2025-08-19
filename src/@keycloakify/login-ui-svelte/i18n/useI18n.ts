import type { createUseI18n } from './getI18n';
import { getI18nContext } from './i18nContext';

export function useI18n(): ReturnType<typeof createUseI18n>['ofTypeI18n'] {
  const contextValue = getI18nContext();

  if (contextValue === undefined) {
    throw new Error('useI18n must be used within a I18nProvider');
  }

  return contextValue;
}
