<script lang="ts">
  import type { InputFieldByTypeProps } from './InputFieldByTypeProps';
  import InputTag from './InputTag.svelte';
  import InputTagSelects from './InputTagSelects.svelte';
  import SelectTag from './SelectTag.svelte';
  import TextareaTag from './TextareaTag.svelte';

  const props: InputFieldByTypeProps = $props();
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
  <TextareaTag {...props} />
{:else if ['select', 'multiselect'].includes(inputType)}
  <SelectTag {...props} />
{:else if ['select-radiobuttons', 'multiselect-checkboxes'].includes(inputType)}
  <InputTagSelects {...props} />
{:else}
  <!-- default -->
  {#if valueOrValues instanceof Array}
    {#each valueOrValues as _, i (i)}
      <InputTag
        {...props}
        fieldIndex={i}
      />
    {/each}
  {:else}
    <InputTag {...props} />
  {/if}
{/if}
