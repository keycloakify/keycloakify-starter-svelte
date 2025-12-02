import type { EventDispatcher } from 'svelte';
import type { Attribute, FormAction, FormFieldError } from '../../../@keycloakify/login-ui-svelte/useUserProfileForm';

export type InputFieldByTypeProps = {
  attribute: Attribute;
  valueOrValues: string | string[];
  displayableErrors: FormFieldError[];
  dispatchFormAction: EventDispatcher<{ formAction: FormAction }>;
};
