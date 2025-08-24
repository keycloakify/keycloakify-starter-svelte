import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'delete-account-confirm.ftl';
  triggered_from_aia: boolean;
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'delete-account-confirm.ftl',
  triggered_from_aia: true,
};
