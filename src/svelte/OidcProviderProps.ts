import type { OidcInitializationError } from 'oidc-spa';
import type { Component, Snippet } from 'svelte';

export type OidcProviderProps = {
  Fallback?: Component;
  ErrorFallback?: Component<{ initializationError: OidcInitializationError }>;
  children?: Snippet;
};
