import { type KcContextCommon, kcContextCommonMock } from '../../components/Template/KcContextCommon';

export type KcContext = KcContextCommon & {
  pageId: 'webauthn-register.ftl';
  challenge: string;
  userid: string;
  username: string;
  signatureAlgorithms: string[];
  rpEntityName: string;
  rpId: string;
  attestationConveyancePreference: string;
  authenticatorAttachment: string;
  requireResidentKey: string;
  userVerificationRequirement: string;
  createTimeout: number | string;
  excludeCredentialIds: string;
  isSetRetry?: boolean;
  isAppInitiatedAction?: boolean;
};

export const kcContextMock: KcContext = {
  ...kcContextCommonMock,
  pageId: 'webauthn-register.ftl',
  challenge: 'random-challenge-string',
  userid: 'user123',
  username: 'johndoe',
  signatureAlgorithms: ['ES256', 'RS256'],
  rpEntityName: 'Example Corp',
  rpId: 'example.com',
  attestationConveyancePreference: 'direct',
  authenticatorAttachment: 'platform',
  requireResidentKey: 'required',
  userVerificationRequirement: 'preferred',
  createTimeout: 60000,
  excludeCredentialIds: 'credId123,credId456',
  isSetRetry: false,
  isAppInitiatedAction: true,
};
