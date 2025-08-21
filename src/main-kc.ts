import { mount } from 'svelte';
import KcPage from './kc.gen.svelte';

if (!window.kcContext) {
  throw new Error('No Keycloak context');
}

const app = mount(KcPage, {
  target: document.getElementById('kc-root')!,
  props: { kcContext: window.kcContext },
});

export default app;
