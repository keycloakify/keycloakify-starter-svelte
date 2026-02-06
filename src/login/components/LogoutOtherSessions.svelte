<script lang="ts">
  import type { KcClsx } from 'keycloakify/login/lib/kcClsx';
  import type { I18n } from '../i18n';
  import type { Readable } from 'svelte/store';

  const { kcClsx, i18n }: { kcClsx: KcClsx; i18n: Readable<I18n> } = $props();

  const { msg } = $i18n;
</script>

<div
  id="kc-form-options"
  class={kcClsx('kcFormOptionsClass')}
>
  <div class={kcClsx('kcFormOptionsWrapperClass')}>
    <div class="checkbox">
      <label>
        <input
          type="checkbox"
          id="logout-sessions"
          name="logout-sessions"
          value="on"
          checked={true}
        />
        {@render msg('logoutOtherSessions')()}
      </label>
    </div>
  </div>
</div>
