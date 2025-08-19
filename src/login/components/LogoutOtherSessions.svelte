<script lang="ts">
  import { useKcClsx } from '../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../i18n';

  const { msg } = useI18n();

  const { kcClsx } = useKcClsx();
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
          defaultChecked={true}
        />
        {msg('logoutOtherSessions')}
      </label>
    </div>
  </div>
</div>
