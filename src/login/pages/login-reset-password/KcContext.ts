import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'login-reset-password.ftl';
  realm: {
    loginWithEmailAllowed: boolean;
    duplicateEmailsAllowed: boolean;
  };
  url: {
    loginResetCredentialsUrl: string;
  };
  auth: {
    attemptedUsername?: string;
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'login-reset-password.ftl',
  realm: {
    ...kcContextCommonMock.realm,
    loginWithEmailAllowed: false,
    duplicateEmailsAllowed: true,
  },
  auth: {},
  url: {
    loginAction: '#',
    loginResetCredentialsUrl: '#',
    loginRestartFlowUrl: '#',
    loginUrl: '#',
    ssoLoginInOtherTabsUrl: '#',
  },
};
