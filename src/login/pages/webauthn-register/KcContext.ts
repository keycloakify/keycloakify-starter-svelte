import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'webauthn-register.ftl';
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'webauthn-register.ftl',
};
