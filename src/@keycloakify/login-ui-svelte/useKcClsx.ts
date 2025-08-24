import type { KcClsx } from '../login-ui/core/kcClsx';
import { getKcClsxContext } from './kcClsxContext';

export function useKcClsx(): { kcClsx: KcClsx; doUseDefaultCss: boolean } {
  const contextValue = getKcClsxContext();

  if (contextValue === undefined) {
    throw new Error('useKcClsx must be used within a KcClsxProvider');
  }

  return contextValue;
}
