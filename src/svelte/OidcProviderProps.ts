import type { Oidc, OidcInitializationError } from 'oidc-spa';
import type { Component, Snippet } from 'svelte';

export type OidcProviderProps = {
  Fallback?: Component;
  ErrorFallback?: Component<{ initializationError: OidcInitializationError }>;
  children?: Snippet;
  initializeOidc: Promise<OidcInitializationError | Oidc<Record<string, unknown>>>;
};
