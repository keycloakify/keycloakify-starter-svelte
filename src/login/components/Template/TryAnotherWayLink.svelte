<script lang="ts">
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import { useKcContext } from '../../KcContext.gen';
  import { useI18n } from '../../i18n';

  const { kcContext } = useKcContext();
  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();
</script>

{#if kcContext.auth?.showTryAnotherWayLink}
  <form
    id="kc-select-try-another-way-form"
    action={kcContext.url.loginAction}
    method="post"
    novalidate={true}
  >
    <input
      type="hidden"
      name="tryAnotherWay"
      value="on"
    />
    <a
      id="try-another-way"
      href="javascript:document.forms['kc-select-try-another-way-form'].requestSubmit()"
      class={kcClsx('kcButtonSecondaryClass', 'kcButtonBlockClass', 'kcMarginTopClass')}
    >
      {@render msg('doTryAnotherWay')()}
    </a>
  </form>
{/if}
