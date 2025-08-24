<script lang="ts">
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  let selectTryAnotherWayFormEl: HTMLFormElement;
  function tryAnotherWay() {
    selectTryAnotherWayFormEl.requestSubmit();
  }
</script>

{#if kcContext.auth?.showTryAnotherWayLink}
  <form
    id="kc-select-try-another-way-form"
    action={kcContext.url.loginAction}
    method="post"
    novalidate
    bind:this={selectTryAnotherWayFormEl}
  >
    <input
      type="hidden"
      name="tryAnotherWay"
      value="on"
    />
    <a
      id="try-another-way"
      class={kcClsx('kcButtonSecondaryClass', 'kcButtonBlockClass', 'kcMarginTopClass')}
      role="button"
      tabindex="0"
      onclick={tryAnotherWay}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          tryAnotherWay();
          e.preventDefault();
        }
      }}
    >
      {@render msg('doTryAnotherWay')()}
    </a>
  </form>
{/if}
