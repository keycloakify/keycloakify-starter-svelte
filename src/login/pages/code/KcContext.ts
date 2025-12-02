import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'code.ftl';
  code: {
    code: string;
    success: boolean;
    error?: string;
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'code.ftl',
  code: {
    code: '123456789',
    success: true,
  },
};
