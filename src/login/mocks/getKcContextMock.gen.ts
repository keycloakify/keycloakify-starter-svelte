import { deepAssign } from '../../@keycloakify/login-ui-svelte/tools/deepAssign';
import type { DeepPartial } from '../../@keycloakify/login-ui-svelte/tools/DeepPartial';
import { structuredCloneButFunctions } from '../../@keycloakify/login-ui-svelte/tools/structuredCloneButFunctions';
import type { KcContext } from '../KcContext.gen';

import { kcContextMock as kcContextMock_code } from '../pages/code/KcContext';
import { kcContextMock as kcContextMock_delete_account_confirm } from '../pages/delete-account-confirm/KcContext';
import { kcContextMock as kcContextMock_delete_credential } from '../pages/delete-credential/KcContext';
import { kcContextMock as kcContextMock_link_idp_action } from '../pages/link-idp-action/KcContext';
import { kcContextMock as kcContextMock_login_config_totp } from '../pages/login-config-totp/KcContext';
import { kcContextMock as kcContextMock_login_oauth_grant } from '../pages/login-oauth-grant/KcContext';
import { kcContextMock as kcContextMock_login_otp } from '../pages/login-otp/KcContext';
import { kcContextMock as kcContextMock_login_password } from '../pages/login-password/KcContext';
import { kcContextMock as kcContextMock_login_recovery_authn_code_config } from '../pages/login-recovery-authn-code-config/KcContext';
import { kcContextMock as kcContextMock_login_recovery_authn_code_input } from '../pages/login-recovery-authn-code-input/KcContext';
import { kcContextMock as kcContextMock_login_reset_password } from '../pages/login-reset-password/KcContext';
import { kcContextMock as kcContextMock_login_update_password } from '../pages/login-update-password/KcContext';
import { kcContextMock as kcContextMock_login_username } from '../pages/login-username/KcContext';
import { kcContextMock as kcContextMock_login } from '../pages/login/KcContext';
import { kcContextMock as kcContextMock_register } from '../pages/register/KcContext';

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
        case 'delete-credential.ftl':
          return kcContextMock_delete_credential;
        case 'link-idp-action.ftl':
          return kcContextMock_link_idp_action;
        case 'login-config-totp.ftl':
          return kcContextMock_login_config_totp;
        case 'login-oauth-grant.ftl':
          return kcContextMock_login_oauth_grant;
        case 'login-otp.ftl':
          return kcContextMock_login_otp;
        case 'login-password.ftl':
          return kcContextMock_login_password;
        case 'login-recovery-authn-code-config.ftl':
          return kcContextMock_login_recovery_authn_code_config;
        case 'login-recovery-authn-code-input.ftl':
          return kcContextMock_login_recovery_authn_code_input;
        case 'login-reset-password.ftl':
          return kcContextMock_login_reset_password;
        case 'login-update-password.ftl':
          return kcContextMock_login_update_password;
        case 'login-username.ftl':
          return kcContextMock_login_username;
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
