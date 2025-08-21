import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'login-password.ftl';
  url: {
    loginResetCredentialsUrl: string;
    registrationUrl: string;
  };
  realm: {
    resetPasswordAllowed: boolean;
  };
  auth?: {
    showUsername?: boolean;
    showResetCredentials?: boolean;
    showTryAnotherWayLink?: boolean;
    attemptedUsername?: string;
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'login-password.ftl',
  url: {
    loginAction: '#',
    loginResetCredentialsUrl: '#',
    loginRestartFlowUrl: '#',
    loginUrl: '#',
    registrationUrl: '#',
    ssoLoginInOtherTabsUrl: '#',
  },
  realm: {
    ...kcContextCommonMock.realm,
    resetPasswordAllowed: true,
  },
};
