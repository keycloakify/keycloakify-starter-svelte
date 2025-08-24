import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'link-idp-action.ftl';
  idpDisplayName: string;
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'link-idp-action.ftl',
  idpDisplayName: 'Google',
};
