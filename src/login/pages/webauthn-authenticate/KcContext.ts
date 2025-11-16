import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'webauthn-authenticate.ftl';
  authenticators: {
    authenticators: {
      credentialId: string;
      transports: {
        iconClass: string;
        displayNameProperties?: string[];
      };
      label: string;
      createdAt: string;
    }[];
  };
  challenge: string;
  userVerification: UserVerificationRequirement | 'not specified';
  rpId: string;
  createTimeout: string | number;
  isUserIdentified: 'true' | 'false';
  shouldDisplayAuthenticators: boolean;
  realm: {
    password: boolean;
    registrationAllowed: boolean;
  };
  registrationDisabled?: boolean;
  url: {
    registrationUrl?: string;
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'webauthn-authenticate.ftl',
  url: {
    loginAction: '#',
    loginRestartFlowUrl: '#',
    loginUrl: '#',
    registrationUrl: '#',
    ssoLoginInOtherTabsUrl: '#',
  },
  authenticators: {
    authenticators: [],
  },
  realm: {
    ...kcContextCommonMock.realm,
    password: true,
    registrationAllowed: true,
  },
  challenge: 'cmFuZG9tLWNoYWxsZW5nZS1zdHJpbmc', // must be base64 url encoded for the webauthnRegister script
  rpId: 'example.com',
  createTimeout: 60000,
  isUserIdentified: 'false',
  userVerification: 'not specified',
  shouldDisplayAuthenticators: false,
};
