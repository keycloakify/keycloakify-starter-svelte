<script lang="ts">
  import { assert } from 'tsafe';
  import { useKcClsx } from '../../../@keycloakify/login-ui-svelte/useKcClsx';
  import ActionGroup from '../../components/buttons/ActionGroup.svelte';
  import Button from '../../components/buttons/Button.svelte';
  import { useI18n } from '../../i18n';
  import { useKcContext } from '../../KcContext.gen';

  const { kcContext } = useKcContext();
  assert(kcContext.pageId === 'delete-credential.ftl');

  const { msg } = useI18n();
  const { kcClsx } = useKcClsx();

  const { url, credentialLabel } = kcContext;
</script>

<div
  id="kc-delete-text"
  class={kcClsx('kcContentWrapperClass')}
>
  {@render msg('deleteCredentialMessage', credentialLabel)()}
</div>
<form
  action={url.loginAction}
  class={kcClsx('kcFormClass')}
  method="post"
>
  <ActionGroup>
    <Button
      class={kcClsx('kcButtonPrimaryClass')}
      id="kc-accept"
      name="accept"
      type="submit"
    >
      {@render msg('doConfirmDelete')()}
    </Button>
    <Button
      class={kcClsx('kcButtonSecondaryClass')}
      id="kc-decline"
      name="cancel-aia"
      type="submit"
    >
      {@render msg('doDecline')()}
    </Button>
  </ActionGroup>
</form>
