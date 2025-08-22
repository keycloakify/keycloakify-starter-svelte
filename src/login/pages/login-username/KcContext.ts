import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'login-username.ftl';
  url: {
    loginResetCredentialsUrl: string;
    registrationUrl: string;
  };
  realm: {
    loginWithEmailAllowed: boolean;
    rememberMe: boolean;
    password: boolean;
    resetPasswordAllowed: boolean;
    registrationAllowed: boolean;
  };
  registrationDisabled: boolean;
  login: {
    username?: string;
    rememberMe?: string;
  };
  usernameHidden?: boolean;
  social?: {
    displayInfo: boolean;
    providers?: {
      loginUrl: string;
      alias: string;
      providerId: string;
      displayName: string;
      iconClasses?: string;
    }[];
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'login-username.ftl',
  url: {
    loginAction: '#',
    loginResetCredentialsUrl: '#',
    loginRestartFlowUrl: '#',
    loginUrl: '#',
    ssoLoginInOtherTabsUrl: '#',
    registrationUrl: '#',
  },
  realm: {
    ...kcContextCommonMock.realm,
    loginWithEmailAllowed: true,
    rememberMe: true,
    password: true,
    resetPasswordAllowed: true,
    registrationAllowed: true,
  },
  social: {
    displayInfo: true,
  },
  usernameHidden: false,
  login: {},
  registrationDisabled: false,
};
