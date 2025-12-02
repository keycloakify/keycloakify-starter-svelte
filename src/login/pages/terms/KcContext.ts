import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'terms.ftl';
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'terms.ftl',
};
