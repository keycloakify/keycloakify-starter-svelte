<script lang="ts">
  import type { Snippet } from 'svelte';
  import { useKcClsx } from '../../../../@keycloakify/login-ui-svelte/useKcClsx';

  type Props = {
    className?: string;
    children: Snippet;
  };
  const { className, children }: Props = $props();

  const { kcClsx } = useKcClsx();
</script>

<div class={className}>
  <div
    class={kcClsx('kcFormHelperTextClass')}
    aria-live="polite"
  >
    <div class={kcClsx('kcInputHelperTextClass')}>
      <div class={kcClsx('kcInputHelperTextItemClass', 'kcError')}>
        <span class={kcClsx('kcInputErrorMessageClass')}>{@render children()}</span>
      </div>
    </div>
  </div>
</div>
