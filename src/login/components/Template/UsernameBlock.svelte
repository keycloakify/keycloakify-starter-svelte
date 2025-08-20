<script lang="ts">
  import { clsx } from '../../../@keycloakify/login-ui-svelte/tools/clsx';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';
  import { Group } from '../field/Group';

  const id = $props.id();
  const { kcClsx } = useKcClsx();
  const { kcContext } = useKcContext();
  const { msg, msgStr } = useI18n();

  const inputId = `kc-attempted-username-${id}`;
</script>

{#if kcContext.auth?.showUsername && !kcContext.auth.showResetCredentials}
  <div class={kcClsx('kcFormClass', 'kcContentWrapperClass')}>
    <Group
      {inputId}
      label={msg(
        !kcContext.realm.loginWithEmailAllowed
          ? 'username'
          : !kcContext.realm.registrationEmailAsUsername
            ? 'usernameOrEmail'
            : 'email',
      )}
    >
      <div class={kcClsx('kcInputGroup')}>
        <div class={kcClsx('kcInputGroupItemClass', 'kcFill')}>
          <span class={kcClsx('kcInputClass', 'kcFormReadOnlyClass')}>
            <input
              id={inputId}
              value={kcContext.auth.attemptedUsername}
              readOnly
            />
          </span>
        </div>
        <div class={kcClsx('kcInputGroupItemClass')}>
          <button
            id="reset-login"
            class={clsx(kcClsx('kcFormPasswordVisibilityButtonClass'), 'kc-login-tooltip')}
            type="button"
            aria-label={msgStr('restartLoginTooltip')}
            onclick={() => {
              window.location.href = kcContext.url.loginRestartFlowUrl;
            }}
          >
            <i
              class="fa-sync-alt fas"
              aria-hidden="true"
            ></i>
            <span class="kc-tooltip-text">{@render msg('restartLoginTooltip')()}</span>
          </button>
        </div>
      </div>
    </Group>
  </div>
{/if}
