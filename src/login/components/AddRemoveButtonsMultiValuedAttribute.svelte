<script lang="ts">
  import {
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction,
  } from '@keycloakify/svelte/login/lib/useUserProfileForm';
  import type { Attribute } from 'keycloakify/login/KcContext';
  import type { EventDispatcher } from 'svelte';
  import type { Readable } from 'svelte/store';
  import type { I18n } from '../i18n';

  type AddRemoveButtonsMultiValuedAttributeProps = {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: EventDispatcher<{ formAction: Extract<FormAction, { action: 'update' }> }>;
    i18n: Readable<I18n>;
  };
  const { attribute, values, fieldIndex, dispatchFormAction, i18n }: AddRemoveButtonsMultiValuedAttributeProps =
    $props();
  const { msg } = $i18n;

  const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({ attribute, values, fieldIndex });

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
    {@render msg('remove')()}
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
