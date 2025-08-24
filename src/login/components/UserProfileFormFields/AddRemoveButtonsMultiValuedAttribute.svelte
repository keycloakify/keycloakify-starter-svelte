<script lang="ts">
  import type { EventDispatcher } from 'svelte';
  import {
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction,
    type Attribute,
  } from '../../../@keycloakify/login-ui-svelte/useUserProfileForm';
  import { useI18n } from '../../i18n';

  const props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: EventDispatcher<{ formAction: Extract<FormAction, { action: 'update' }> }>;
  } = $props();
  const { attribute, values, fieldIndex, dispatchFormAction } = props;
  const { msg } = useI18n();

  const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({
    attribute,
    values,
    fieldIndex,
  });

  const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;
</script>

{#if hasRemove}
  <button
    id={`kc-remove${idPostfix}`}
    type="button"
    class="pf-c-button pf-m-inline pf-m-link"
    onclick={() =>
      dispatchFormAction('formAction', {
        action: 'update',
        name: attribute.name,
        valueOrValues: values.filter((_, i) => i !== fieldIndex),
      })}
  >
    {msg('remove')}
  </button>
  {#if hasAdd}&nbsp;|&nbsp;{/if}
{/if}
{#if hasAdd}
  <button
    id={`kc-add${idPostfix}`}
    type="button"
    class="pf-c-button pf-m-inline pf-m-link"
    onclick={() =>
      dispatchFormAction('formAction', {
        action: 'update',
        name: attribute.name,
        valueOrValues: [...values, ''],
      })}
  >
    {@render msg('addValue')()}
  </button>
{/if}
