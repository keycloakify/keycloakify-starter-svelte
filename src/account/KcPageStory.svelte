<script lang="ts">
  import KcPage from './KcPage.svelte';
  import { getKcContextMock, type KcPageStoryProps } from './KcPageStory';

  const { pageId, kcContext }: KcPageStoryProps = $props();
  const kcContextMock = getKcContextMock({ pageId, overrides: kcContext });
</script>

<KcPage kcContext={kcContextMock} />
