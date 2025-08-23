import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'webauthn-authenticate.ftl';
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'webauthn-authenticate.ftl',
};
