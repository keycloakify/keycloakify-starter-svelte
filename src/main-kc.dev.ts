import { mount } from 'svelte';
import KcPage from './kc.gen.svelte';
import { getKcContextMock } from './login/mocks/getKcContextMock.gen';
import Spinner from './Spinner.svelte';

const kcContext = getKcContextMock({
  pageId: 'register.ftl',
  overrides: {},
});

const app = mount(KcPage, {
  target: document.getElementById('kc-root')!,
  props: { kcContext: kcContext, Fallback: Spinner },
});

export default app;
