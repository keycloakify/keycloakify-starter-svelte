import { getContext, setContext } from 'svelte';
import { type KcClsx } from '../login-ui/core/kcClsx';

export const KC_CLSX_KEY = Symbol('kcClsx');

export const setKcClsxContext = ({ kcClsx, doUseDefaultCss }: { kcClsx: KcClsx; doUseDefaultCss: boolean }) => {
  setContext<{ kcClsx: KcClsx; doUseDefaultCss: boolean } | undefined>(KC_CLSX_KEY, { kcClsx, doUseDefaultCss });
};

export const getKcClsxContext = () => {
  return getContext<{ kcClsx: KcClsx; doUseDefaultCss: boolean } | undefined>(KC_CLSX_KEY);
};
