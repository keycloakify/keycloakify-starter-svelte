<script lang="ts">
  import { type Snippet } from 'svelte';
  import { getKcClsx, type ClassKey } from '../login-ui/core/kcClsx';
  import { setKcClsxContext } from './kcClsxContext';

  const props: {
    doUseDefaultCss: boolean;
    classes: Partial<Record<ClassKey, string>> | undefined;
    children: Snippet;
  } = $props();
  const { doUseDefaultCss, classes, children } = props;
  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  setKcClsxContext({ kcClsx, doUseDefaultCss });
</script>

{@render children()}
