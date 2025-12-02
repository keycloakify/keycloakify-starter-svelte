import type { Snippet } from 'svelte';
import type { ReturnTypeOfUseUserProfileForm } from '../../../@keycloakify/login-ui-svelte/useUserProfileForm';

export type ParamsOfBeforeAfterFields = {
  attributeName: string;
  userProfileForm: ReturnTypeOfUseUserProfileForm;
};

export type UserProfileFormFieldsProps = {
  onAreAllChecksPassedValueChange: (areAllChecksPassed: boolean) => void;
  renderBeforeField?: Snippet<[ParamsOfBeforeAfterFields]>;
  renderAfterField?: Snippet<[ParamsOfBeforeAfterFields]>;
};
