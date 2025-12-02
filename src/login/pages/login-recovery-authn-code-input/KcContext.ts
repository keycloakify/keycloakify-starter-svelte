import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'login-recovery-authn-code-input.ftl';
  recoveryAuthnCodesInputBean: {
    codeNumber: number;
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'login-recovery-authn-code-input.ftl',
  recoveryAuthnCodesInputBean: {
    codeNumber: 1234,
  },
};
