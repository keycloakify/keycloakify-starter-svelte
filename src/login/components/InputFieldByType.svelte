<script lang="ts">
  import type { InputFieldByTypeProps } from '@keycloakify/svelte/login/components/InputFieldByTypeProps';
  import InputTag from './InputTag.svelte';
  import InputTagSelects from './InputTagSelects.svelte';
  import PasswordWrapper from './PasswordWrapper.svelte';
  import SelectTag from './SelectTag.svelte';
  import TextareaTag from './TextareaTag.svelte';
  import type { I18n } from '../i18n/i18n';

  let { displayableErrors, ...props }: InputFieldByTypeProps<I18n> = $props();
  const { attribute, valueOrValues } = props;
  const inputType = attribute.annotations.inputType ?? '';
</script>

{#if inputType === 'hidden'}
  <input
    type="hidden"
    name={attribute.name}
    value={valueOrValues}
  />
{:else if inputType === 'textarea'}
  <TextareaTag
    {...props}
    {displayableErrors}
  />
{:else if ['select', 'multiselect'].includes(inputType)}
  <SelectTag
    {...props}
    {displayableErrors}
  />
{:else if ['select-radiobuttons', 'multiselect-checkboxes'].includes(inputType)}
  <InputTagSelects
    {...props}
    {displayableErrors}
  />
{:else}
  <!-- default -->
  {#if valueOrValues instanceof Array}
    {#each valueOrValues as _, i (i)}
      <InputTag
        {...props}
        bind:displayableErrors
        fieldIndex={i}
      />
    {/each}
  {:else}
    {#snippet inputNode()}
      <InputTag
        {...props}
        bind:displayableErrors
      />
    {/snippet}
    {#if ['password', 'password-confirm'].includes(attribute.name)}
      <PasswordWrapper
        kcClsx={props.kcClsx}
        i18n={props.i18n}
        passwordInputId={attribute.name}
      >
        {@render inputNode()}
      </PasswordWrapper>
    {:else}
      {@render inputNode()}
    {/if}
  {/if}
{/if}
