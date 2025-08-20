<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import type { Snippet } from 'svelte';

  type Props = HTMLAnchorAttributes & { children: Snippet };
  const props: Props = $props();
  const { kcClsx } = useKcClsx();
</script>

<a
  {...props}
  class={props.class || kcClsx('kcButtonSecondaryClass')}
>
  {@render props.children()}
</a>
