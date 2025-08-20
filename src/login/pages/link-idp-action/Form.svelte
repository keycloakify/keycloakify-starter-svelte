<script lang="ts">
  import { assert } from 'tsafe';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import ActionGroup from '../../components/buttons/ActionGroup.svelte';
  import Button from '../../components/buttons/Button.svelte';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'link-idp-action.ftl');

  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, idpDisplayName } = kcContext;
</script>

<div
  id="kc-link-text"
  class={kcClsx('kcContentWrapperClass')}
>
  {@render msg('linkIdpActionMessage', idpDisplayName)()}
</div>
<form
  action={url.loginAction}
  class={kcClsx('kcFormClass')}
  method="post"
>
  <ActionGroup>
    <Button
      class={kcClsx('kcButtonPrimaryClass')}
      id="kc-continue"
      name="continue"
      type="submit"
    >
      {@render msg('doContinue')()}
    </Button>
    <Button
      class={kcClsx('kcButtonSecondaryClass')}
      id="kc-cancel"
      name="cancel-aia"
      type="submit"
    >
      {@render msg('doCancel')()}
    </Button>
  </ActionGroup>
</form>
