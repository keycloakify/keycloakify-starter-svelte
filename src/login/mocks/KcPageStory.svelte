<script lang="ts">
  // NOTE: This is not a file that you typically want to modify.

  import type { DeepPartial } from '../../@keycloakify/login-ui-svelte/tools/DeepPartial';
  import type { KcContext } from '../KcContext.gen';
  import KcPage from '../KcPage.svelte';
  import { getKcContextMock } from './getKcContextMock.gen';
  export type { Meta, StoryObj } from '../../kc.gen';

  type PageId = KcContext['pageId'];
  export type KcPageStoryProps = { pageId: PageId; kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>> };

  const { pageId, kcContext }: KcPageStoryProps = $props();
  const kcContextMock = getKcContextMock({ pageId, overrides: kcContext });
</script>

<KcPage kcContext={kcContextMock} />
