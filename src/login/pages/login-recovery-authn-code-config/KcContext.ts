import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'login-recovery-authn-code-config.ftl';
  recoveryAuthnCodesConfigBean: {
    generatedRecoveryAuthnCodesList: string[];
    generatedRecoveryAuthnCodesAsString: string;
    generatedAt: number;
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'login-recovery-authn-code-config.ftl',
  recoveryAuthnCodesConfigBean: {
    generatedRecoveryAuthnCodesList: ['123412341234', '456745674567', '789078907890'],
    generatedRecoveryAuthnCodesAsString: '123412341234, 456745674567, 789078907890',
    generatedAt: new Date().getTime(),
  },
};
