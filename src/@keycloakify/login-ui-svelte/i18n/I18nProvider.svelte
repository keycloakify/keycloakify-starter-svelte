<script lang="ts">
  import { type Snippet } from 'svelte';
  import type { KcContextLike, ReturnTypeOfCreateUseI18n } from './getI18n';
  import { setI18nContext } from './i18nContext';

  const props: {
    kcContext: KcContextLike;
    getI18n: ReturnTypeOfCreateUseI18n<any, any>['getI18n'];
    children: Snippet;
  } = $props();
  const { kcContext, getI18n, children } = props;

  const { i18n } = getI18n({ kcContext });
  setI18nContext($i18n);
</script>

{@render children()}
