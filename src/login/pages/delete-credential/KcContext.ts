import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'delete-credential.ftl';
  credentialLabel: string;
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'delete-credential.ftl',
  credentialLabel: 'credential',
};
