import { mount } from 'svelte';
import KcPage from './kc.gen.svelte';
import { getKcContextMock } from './login/mocks/getKcContextMock.gen';

const kcContext = getKcContextMock({
  pageId: 'webauthn-authenticate.ftl',
  overrides: {},
});

const app = mount(KcPage, {
  target: document.getElementById('kc-root')!,
  props: { kcContext: kcContext },
});

export default app;
