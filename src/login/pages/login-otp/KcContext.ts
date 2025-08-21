import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'login-otp.ftl';
  otpLogin: {
    userOtpCredentials: {
      id: string;
      userLabel: string;
    }[];
    selectedCredentialId?: string;
  };
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'login-otp.ftl',
  otpLogin: {
    userOtpCredentials: [
      {
        id: 'id1',
        userLabel: 'label1',
      },
      {
        id: 'id2',
        userLabel: 'label2',
      },
    ],
    selectedCredentialId: 'id2',
  },
};
