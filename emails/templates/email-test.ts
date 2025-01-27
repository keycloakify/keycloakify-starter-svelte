import { render } from '@keycloakify/svelte-email';
import type { GetSubject, GetTemplate } from 'keycloakify-emails';

export const getTemplate: GetTemplate = async (props) => {
  return await render({
    template: (await import('../svelte-templates/email-test.svelte')).default,
    props: {},
    options: { plainText: props.plainText },
  });
};

export const getSubject: GetSubject = async (props) => {
  return '[KEYCLOAK] - SMTP test message';
};
