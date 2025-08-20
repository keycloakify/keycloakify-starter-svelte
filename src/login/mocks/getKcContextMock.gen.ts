import { deepAssign } from '../../@keycloakify/login-ui-svelte/tools/deepAssign';
import type { DeepPartial } from '../../@keycloakify/login-ui-svelte/tools/DeepPartial';
import { structuredCloneButFunctions } from '../../@keycloakify/login-ui-svelte/tools/structuredCloneButFunctions';
import type { KcContext } from '../KcContext.gen';

import { kcContextMock as kcContextMock_code } from '../pages/code/KcContext';
import { kcContextMock as kcContextMock_login } from '../pages/login/KcContext';
import { kcContextMock as kcContextMock_register } from '../pages/register/KcContext';
import { kcContextMock as kcContextMock_delete_account_confirm } from '../pages/delete-account-confirm/KcContext';

export function getKcContextMock<PageId extends KcContext['pageId']>(params: {
  pageId: PageId;
  overrides?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
}) {
  const { pageId, overrides } = params;

  const kcContextMock = structuredCloneButFunctions(
    (() => {
      switch (pageId) {
        case 'login.ftl':
          return kcContextMock_login;
        case 'register.ftl':
          return kcContextMock_register;
        case 'code.ftl':
          return kcContextMock_code;
        case 'delete-account-confirm.ftl':
          return kcContextMock_delete_account_confirm;
      }
    })(),
  );

  if (overrides !== undefined) {
    deepAssign({
      source: kcContextMock,
      target: overrides,
    });
  }

  return kcContextMock;
}
