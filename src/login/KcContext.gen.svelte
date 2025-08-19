<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setKcContext, type KcContext } from './KcContext.gen';

  const props: { kcContext: KcContext; children: Snippet } = $props();
  const { kcContext, children } = props;
  setKcContext(kcContext);
</script>

{@render children()}
