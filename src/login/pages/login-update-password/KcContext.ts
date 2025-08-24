import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'login-update-password.ftl';
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'login-update-password.ftl',
};
