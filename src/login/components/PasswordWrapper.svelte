<script lang="ts">
  import { useReducer } from '@keycloakify/svelte/tools/useReducer';
  import type { KcClsx } from 'keycloakify/login/lib/kcClsx';
  import { assert } from 'keycloakify/tools/assert';
  import { onMount, type Snippet } from 'svelte';
  import type { I18n } from '../i18n';
  import type { Readable } from 'svelte/store';

  const props: { kcClsx: KcClsx; i18n: Readable<I18n>; passwordInputId: string; children: Snippet } = $props();
  const { kcClsx, i18n, passwordInputId, children } = props;

  const { msgStr } = $i18n;

  const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer<boolean, boolean>(
    (isPasswordRevealed: boolean) => !isPasswordRevealed,
    false,
  );
  onMount(() => {
    const unsubscribe = isPasswordRevealed.subscribe(($isPasswordRevealed) => {
      const passwordInputElement: HTMLInputElement = document.getElementById(passwordInputId) as HTMLInputElement;

      assert(passwordInputElement instanceof HTMLInputElement);
      passwordInputElement.type = $isPasswordRevealed ? 'text' : 'password';
    });
    return () => unsubscribe();
  });
</script>

<div class={kcClsx('kcInputGroup')}>
  {@render children?.()}
  <button
    type="button"
    class={kcClsx('kcFormPasswordVisibilityButtonClass')}
    aria-label={msgStr($isPasswordRevealed ? 'hidePassword' : 'showPassword')}
    aria-controls={passwordInputId}
    onclick={() => toggleIsPasswordRevealed($isPasswordRevealed)}
  >
    <i
      class={kcClsx($isPasswordRevealed ? 'kcFormPasswordVisibilityIconHide' : 'kcFormPasswordVisibilityIconShow')}
      aria-hidden="true"
    ></i>
  </button>
</div>
