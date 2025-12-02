import type { ClassKey } from '../../../@keycloakify/login-ui/core/kcClsx';
import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'select-authenticator.ftl';
  auth: {
    authenticationSelections: {
      authExecId: string;
      displayName: string;
      helpText: string;
      iconCssClass?: ClassKey;
    }[];
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'select-authenticator.ftl',
  auth: {
    authenticationSelections: [
      {
        authExecId: 'f607f83c-537e-42b7-99d7-c52d459afe84',
        displayName: 'otp-display-name',
        helpText: 'otp-help-text',
        iconCssClass: 'kcAuthenticatorOTPClass',
      },
      {
        authExecId: '5ed881b1-84cd-4e9b-b4d9-f329ea61a58c',
        displayName: 'webauthn-display-name',
        helpText: 'webauthn-help-text',
        iconCssClass: 'kcAuthenticatorWebAuthnClass',
      },
    ],
  },
};
