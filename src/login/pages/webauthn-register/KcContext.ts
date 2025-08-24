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
  challenge: 'cmFuZG9tLWNoYWxsZW5nZS1zdHJpbmc', // must be base64 url encoded for the webauthnRegister script
  userid: 'dXNlcjEyMw', // must be base64 url encoded for the webauthnRegister script
  username: 'johndoe',
  signatureAlgorithms: ['ES256', 'RS256'],
  rpEntityName: 'Example Corp',
  rpId: 'example.com',
  attestationConveyancePreference: 'direct',
  authenticatorAttachment: 'platform',
  requireResidentKey: 'required',
  userVerificationRequirement: 'preferred',
  createTimeout: 60000,
  excludeCredentialIds: 'Y3JlZElkMTIz,Y3JlZElkNDU2', // must be base64 url encoded for the webauthnRegister script
  isSetRetry: false,
  isAppInitiatedAction: true,
};
