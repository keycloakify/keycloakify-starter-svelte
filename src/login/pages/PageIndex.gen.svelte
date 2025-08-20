<script lang="ts">
  import type { Component } from 'svelte';
  import { assert, type Equals } from 'tsafe/assert';
  import { useKcContext } from '../KcContext.gen';

  const { kcContext } = useKcContext();

  const page = async (): Promise<{ default: Component<object> }> =>
    (() => {
      switch (kcContext.pageId) {
        case 'login.ftl':
          return import('./login');
        case 'register.ftl':
          return import('./register');
        case 'code.ftl':
          return import('./code');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      assert<Equals<typeof kcContext, never>>;
    })() as Promise<{ default: Component<object> }>;
</script>

{#await page() then { default: Page }}
  <Page></Page>
{/await}
