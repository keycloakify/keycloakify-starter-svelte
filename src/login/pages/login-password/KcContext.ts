import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'login-password.ftl';
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'login-password.ftl',
};
