<script lang="ts">
  import type { Snippet } from 'svelte';
  import { clsx } from '../../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useKcClsx } from '../../../../@keycloakify/login-ui-svelte/useKcClsx';
  import ErrorContainer from './ErrorContainer.svelte';

  type Props = {
    className?: string;
    style?: string;
    inputId: string;
    label?: Snippet;
    error?: Snippet;
    required?: boolean;
    children: Snippet;
  };
  const { className, style, inputId, label, error, required = false, children }: Props = $props();

  const { kcClsx } = useKcClsx();
</script>

<div
  class={clsx(kcClsx('kcFormGroupClass'), className)}
  {style}
>
  <div class={kcClsx('kcFormGroupLabelClass')}>
    <label
      for={inputId}
      class={kcClsx('kcFormLabelClass')}
    >
      <span class={kcClsx('kcFormLabelTextClass')}>{@render label?.()}</span>
      {#if required}
        <span
          class={kcClsx('kcInputRequiredClass')}
          aria-hidden="true"
        >
          &#42;
        </span>
      {/if}
    </label>
  </div>

  {@render children()}

  {#if error}<ErrorContainer>{@render error()}</ErrorContainer>{/if}
</div>
