import { mount } from 'svelte';
import KcPage from './kc.gen.svelte';
import Spinner from './Spinner.svelte';

// The following block can be uncommented to test a specific page with `yarn dev`
// Don't forget to comment back or your bundle size will increase

import { getKcContextMock } from './account/KcPageStory';

if (import.meta.env.DEV) {
  window.kcContext = getKcContextMock({
    pageId: 'account.ftl',
    overrides: {},
  });
}

let app;
if (window.kcContext) {
  app = mount(KcPage, {
    target: document.getElementById('kc-root')!,
    props: { kcContext: window.kcContext, Fallback: Spinner },
  });
}
export default app;
