<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';

  type Props = HTMLButtonAttributes;
  const props: Props = $props();
  const { kcClsx } = useKcClsx();
</script>

<!-- TODO: This component is very poorly designed, not consistent on how it works with className // Plus we don't have
kcButtonClass for some reason -->

<button
  {...props}
  class={props.class || kcClsx('kcButtonPrimaryClass')}
></button>
