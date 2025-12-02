import { onMount } from 'svelte';
import type { Readable } from 'svelte/store';
import { id } from 'tsafe/id';
import { useConst } from './useConst';

/** Callback is guaranteed to be call only once per component mount event in strict mode */
export function useOnFirstMount(params: { effect: () => void; isEnabled?: Readable<boolean> }) {
  const { effect, isEnabled } = params;

  const refHasCallbackBeenCalled = useConst(() => ({ current: id<boolean>(false) }));

  onMount(() => {
    if (!isEnabled) {
      return;
    }
    const unsubscribe = isEnabled.subscribe((enabled) => {
      if (!enabled) return;
      if (refHasCallbackBeenCalled.current) {
        return;
      }

      effect();

      refHasCallbackBeenCalled.current = true;
    });
    return () => unsubscribe();
  });
}
