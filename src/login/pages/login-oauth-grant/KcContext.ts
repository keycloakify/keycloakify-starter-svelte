import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'login-oauth-grant.ftl';
  oauth: {
    code: string;
    client: string;
    clientScopesRequested: {
      consentScreenText: string;
      dynamicScopeParameter?: string;
    }[];
  };
  url: {
    oauthAction: string;
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'login-oauth-grant.ftl',
  oauth: {
    code: '5-1N4CIzfi1aprIQjmylI-9e3spLCWW9i5d-GDcs-Sw',
    clientScopesRequested: [
      { consentScreenText: '${profileScopeConsentText}' },
      { consentScreenText: '${rolesScopeConsentText}' },
      { consentScreenText: '${emailScopeConsentText}' },
    ],
    client: 'account',
  },
  url: {
    ...kcContextCommonMock.url,
    oauthAction: '#',
  },
};
