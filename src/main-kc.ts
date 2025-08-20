import { mount } from 'svelte';
import KcPage from './kc.gen.svelte';
import Spinner from './Spinner.svelte';

if (!window.kcContext) {
  throw new Error('No Keycloak context');
}

const app = mount(KcPage, {
  target: document.getElementById('kc-root')!,
  props: { kcContext: window.kcContext, Fallback: Spinner },
});

export default app;
