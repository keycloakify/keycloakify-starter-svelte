import type { ValueOrAsyncGetter } from 'oidc-spa/tools/ValueOrAsyncGetter';
import { createOidcSvelteApi_dependencyInjection } from '../svelte/svelte';
import { createMockOidc, type ParamsOfCreateMockOidc } from 'oidc-spa/mock/oidc';

export function createMockSvelteOidc<
  DecodedIdToken extends Record<string, unknown> = Record<string, unknown>,
  AutoLogin extends boolean = false,
>(params: ValueOrAsyncGetter<ParamsOfCreateMockOidc<DecodedIdToken, AutoLogin>>) {
  return createOidcSvelteApi_dependencyInjection(params, createMockOidc);
}
