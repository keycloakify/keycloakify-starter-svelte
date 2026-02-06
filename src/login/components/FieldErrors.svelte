<script lang="ts">
  import type { FormFieldError } from '@keycloakify/svelte/login/lib/useUserProfileForm';
  import type { Attribute } from 'keycloakify/login/KcContext';
  import type { KcClsx } from 'keycloakify/login/lib/kcClsx';

  type FieldErrorProps = {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    fieldIndex?: number;
    kcClsx: KcClsx;
  };
  let { attribute, fieldIndex, kcClsx, displayableErrors = $bindable([]) }: FieldErrorProps = $props();
</script>

{#snippet fieldErrors()}
  {@const _displayableErrors = displayableErrors.filter((error) => error.fieldIndex === fieldIndex)}
  {#if _displayableErrors.length !== 0}
    <span
      id={`input-error-${attribute.name}${fieldIndex === undefined ? '' : `-${fieldIndex}`}`}
      class={kcClsx('kcInputErrorMessageClass')}
      aria-live="polite"
    >
      {#each _displayableErrors as displayableError, i (i)}
        {@const { errorMessage } = displayableError}
        {@render errorMessage()}
        {#if _displayableErrors.length - 1 !== i}<br />{/if}
      {/each}
    </span>
  {/if}
{/snippet}
{@render fieldErrors()}
