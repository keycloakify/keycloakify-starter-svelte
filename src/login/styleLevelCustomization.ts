/**
 * This file has been claimed for ownership from @keycloakify/login-ui version 250004.1.2.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "login/styleLevelCustomization.tsx" --revert
 */

import type { Component, Snippet } from 'svelte';
import type { ClassKey } from '../@keycloakify/login-ui/core/kcClsx';

type Classes = { [key in ClassKey]?: string };

type StyleLevelCustomization = {
  doUseDefaultCss: boolean;
  classes?: Classes;
  loadCustomStylesheet?: () => void;
  Provider?: Component<{ children: Snippet }>;
};

export function useStyleLevelCustomization(): StyleLevelCustomization {
  return {
    doUseDefaultCss: true,
  };
}
