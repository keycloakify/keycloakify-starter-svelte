<script lang="ts">
  import type { Snippet } from 'svelte';
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';

  const id = $props.id();
  type Props = {
    className?: string;
    label: Snippet;
    required?: boolean;
    renderInput: (inputProps: { className: string; type: 'checkbox'; id: string }) => Snippet;
  };
  const { className, label, required = false, renderInput }: Props = $props();

  const { kcClsx } = useKcClsx();

  const inputId = `checkbox-${id}`;
</script>

<div class={clsx(kcClsx('kcCheckboxClass'), className)}>
  <label
    for={inputId}
    class={kcClsx('kcCheckboxClass')}
  >
    {@render renderInput({
      className: kcClsx('kcCheckboxInputClass'),
      type: 'checkbox',
      id: inputId,
    })()}
    <span class={kcClsx('kcCheckboxLabelClass')}>{@render label()}</span>
    {#if required}
      <span
        class={kcClsx('kcCheckboxLabelRequiredClass')}
        aria-hidden="true"
      >
        &#42;
      </span>
    {/if}
  </label>
</div>
